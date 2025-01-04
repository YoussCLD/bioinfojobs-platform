from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="BioInfoJobs API",
    description="API pour la plateforme de recherche d'emploi en bioinformatique",
    version="1.0.0"
)