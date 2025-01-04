import openai
from typing import List, Dict, Optional
import pandas as pd
from datetime import datetime
import logging
from ..config import settings

class JobAIAgent:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        openai.api_key = settings.OPENAI_API_KEY
        
        self.skill_categories = {
            'programming': ['python', 'r', 'perl', 'java', 'c++', 'bash'],
            'bioinfo_tools': ['blast', 'gatk', 'bwa', 'samtools', 'galaxy'],
            'databases': ['sql', 'mongodb', 'postgresql'],
            'ngs': ['rna-seq', 'dna-seq', 'chip-seq', 'ngs'],
            'stats': ['statistics', 'machine learning', 'deep learning']
        }

    async def analyze_job(self, job_description: str) -> Dict:
        """Analyse une offre d'emploi avec GPT"""
        try:
            response = await openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{
                    "role": "system",
                    "content": "Analyze this bioinformatics job description and extract key information."
                }, {
                    "role": "user",
                    "content": job_description
                }]
            )
            
            analysis = response.choices[0].message.content
            return self._parse_gpt_analysis(analysis)
            
        except Exception as e:
            self.logger.error(f"Error in GPT analysis: {str(e)}")
            return {}

    def calculate_match_score(self, job: Dict, candidate_profile: Dict) -> float:
        """Calcule un score de correspondance entre une offre et un profil"""
        score = 0.0
        weights = {
            'skills': 0.4,
            'experience': 0.3,
            'location': 0.2,
            'job_type': 0.1
        }
        
        # Score des compétences
        job_skills = set(job.get('required_skills', []))
        candidate_skills = set(candidate_profile.get('skills', []))
        skills_match = len(job_skills.intersection(candidate_skills)) / len(job_skills) if job_skills else 0
        score += skills_match * weights['skills']
        
        # Score de l'expérience
        if self._check_experience_match(job, candidate_profile):
            score += weights['experience']
            
        # Score de la localisation
        if self._check_location_match(job, candidate_profile):
            score += weights['location']
            
        # Score du type de contrat
        if self._check_job_type_match(job, candidate_profile):
            score += weights['job_type']
        
        return min(score, 1.0)

    def get_recommendations(self, jobs: List[Dict], candidate_profile: Dict, 
                          limit: int = 10) -> List[Dict]:
        """Obtient les meilleures recommandations pour un candidat"""
        scored_jobs = []
        
        for job in jobs:
            score = self.calculate_match_score(job, candidate_profile)
            job['match_score'] = score
            scored_jobs.append(job)
            
        # Trie par score de correspondance
        scored_jobs.sort(key=lambda x: x['match_score'], reverse=True)
        
        return scored_jobs[:limit]

    def _parse_gpt_analysis(self, analysis: str) -> Dict:
        """Parse la réponse de GPT en structure de données"""
        # Implémentation à faire selon le format de réponse de GPT
        pass

    def _check_experience_match(self, job: Dict, profile: Dict) -> bool:
        """Vérifie si l'expérience correspond"""
        job_exp = job.get('required_experience', 0)
        profile_exp = profile.get('years_experience', 0)
        return profile_exp >= job_exp

    def _check_location_match(self, job: Dict, profile: Dict) -> bool:
        """Vérifie si la localisation correspond"""
        job_location = job.get('location', '').lower()
        preferred_locations = [loc.lower() for loc in profile.get('preferred_locations', [])]
        return job_location in preferred_locations or 'remote' in job_location

    def _check_job_type_match(self, job: Dict, profile: Dict) -> bool:
        """Vérifie si le type de contrat correspond"""
        return job.get('job_type') in profile.get('preferred_job_types', [])
