from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from ..database import get_db
from ..models import job as job_model
from ..schemas import job as job_schema
from ..services.scraper import BioInfoJobScraper
from ..services.ai_agent import JobAIAgent

router = APIRouter()
scraper = BioInfoJobScraper()
ai_agent = JobAIAgent()

@router.get("/jobs/", response_model=List[job_schema.JobInDB])
async def get_jobs(
    skip: int = 0,
    limit: int = 100,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    min_score: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """Récupère la liste des offres d'emploi avec filtres"""
    query = db.query(job_model.Job)
    
    if location:
        query = query.filter(job_model.Job.location.ilike(f"%{location}%"))
    if job_type:
        query = query.filter(job_model.Job.job_type == job_type)
    if min_score:
        query = query.filter(job_model.Job.relevance_score >= min_score)
    
    return query.offset(skip).limit(limit).all()

@router.get("/jobs/refresh")
async def refresh_jobs(db: Session = Depends(get_db)):
    """Force le rafraîchissement des offres d'emploi"""
    try:
        new_jobs = await scraper.scrape_all_sources()
        count = 0
        for job_data in new_jobs:
            # Vérifier si l'offre existe déjà
            existing = db.query(job_model.Job).filter_by(url=job_data["url"]).first()
            if not existing:
                # Analyser l'offre avec l'IA
                analysis = await ai_agent.analyze_job(job_data["description"])
                job_data.update(analysis)
                
                new_job = job_model.Job(**job_data)
                db.add(new_job)
                count += 1
        
        db.commit()
        return {"message": f"Added {count} new jobs"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/jobs/recommendations")
async def get_recommendations(
    profile_id: int,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Obtient des recommandations personnalisées"""
    # À implémenter : récupérer le profil du candidat
    candidate_profile = {
        "skills": ["python", "r", "ngs"],
        "years_experience": 2,
        "preferred_locations": ["Paris", "Remote"],
        "preferred_job_types": ["CDI", "CDD"]
    }
    
    # Récupérer toutes les offres actives
    active_jobs = db.query(job_model.Job).filter_by(is_active=True).all()
    
    # Obtenir les recommandations via l'agent IA
    recommendations = ai_agent.get_recommendations(
        jobs=[job.__dict__ for job in active_jobs],
        candidate_profile=candidate_profile,
        limit=limit
    )
    
    return recommendations

@router.get("/jobs/{job_id}", response_model=job_schema.JobInDB)
async def get_job(job_id: int, db: Session = Depends(get_db)):
    """Récupère une offre d'emploi spécifique"""
    job = db.query(job_model.Job).filter(job_model.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.get("/jobs/stats/overview")
async def get_job_stats(db: Session = Depends(get_db)):
    """Obtient des statistiques sur les offres d'emploi"""
    total_jobs = db.query(job_model.Job).count()
    active_jobs = db.query(job_model.Job).filter_by(is_active=True).count()
    
    # Compter les offres par type
    jobs_by_type = (
        db.query(job_model.Job.job_type, db.func.count(job_model.Job.id))
        .group_by(job_model.Job.job_type)
        .all()
    )
    
    # Compter les offres par localisation
    jobs_by_location = (
        db.query(job_model.Job.location, db.func.count(job_model.Job.id))
        .group_by(job_model.Job.location)
        .limit(10)
        .all()
    )
    
    return {
        "total_jobs": total_jobs,
        "active_jobs": active_jobs,
        "jobs_by_type": dict(jobs_by_type),
        "top_locations": dict(jobs_by_location)
    }
