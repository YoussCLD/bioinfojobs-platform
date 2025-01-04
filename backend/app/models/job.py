from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, Boolean
from sqlalchemy.sql import func
from ..database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(String)
    salary_range = Column(String)
    job_type = Column(String)  # CDI, CDD, etc.
    required_skills = Column(JSON)  # Liste des compétences requises
    url = Column(String, unique=True)
    source = Column(String)  # Indeed, LinkedIn, etc.
    relevance_score = Column(Float)  # Score calculé par l'IA
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    class Config:
        orm_mode = True
