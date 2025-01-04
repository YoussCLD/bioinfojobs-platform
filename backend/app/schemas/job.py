from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    description: str
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    required_skills: Optional[Dict] = None
    url: str
    source: str

class JobCreate(JobBase):
    pass

class JobUpdate(JobBase):
    is_active: Optional[bool] = True

class JobInDB(JobBase):
    id: int
    relevance_score: Optional[float] = None
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
