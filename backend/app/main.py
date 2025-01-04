from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from .routes import api_router
from .database import Base, engine
from .config import settings

# Création des tables dans la base de données
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BioInfoJobs API",
    description="API pour la plateforme de recherche d'emploi en bioinformatique",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À modifier en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes
app.include_router(api_router)

@app.get("/")
async def root():
    """Point d'entrée principal de l'API"""
    return {
        "message": "Bienvenue sur l'API BioInfoJobs",
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/health")
async def health_check():
    """Vérification de l'état de l'API"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "uptime": "operational",
        "database": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
