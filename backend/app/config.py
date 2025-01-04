from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BioInfoJobs API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Configuration de la base de données
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = ""
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "bioinfojobs"
    
    # URL de la base de données
    DATABASE_URL: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    
    # Configuration OpenAI pour l'agent IA
    OPENAI_API_KEY: str = ""
    
    # Configuration du scraping
    SCRAPING_INTERVAL: int = 7200  # 2 heures en secondes
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
