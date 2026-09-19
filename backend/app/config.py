from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "TrafficAI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: Optional[str] = None
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "trafficai"
    USE_POSTGIS: bool = False
    
    # API & Integrations
    DEMO_MODE: bool = False
    
    TRAFFIC_PROVIDER: str = "tomtom"
    TRAFFIC_API_BASE_URL: str = "https://api.tomtom.com/traffic/services/4"
    TRAFFIC_API_KEY: str = ""

    WEATHER_PROVIDER: str = "open_meteo"
    WEATHER_API_BASE_URL: str = "https://api.open-meteo.com/v1"
    WEATHER_API_KEY: str = "" # Open-meteo doesn't require key

    ROUTING_PROVIDER: str = "google"
    ROUTING_API_BASE_URL: str = ""
    ROUTING_API_KEY: str = ""

    INCIDENT_PROVIDER: str = "tomtom"
    INCIDENT_API_BASE_URL: str = "https://api.tomtom.com/traffic/services/5"
    INCIDENT_API_KEY: str = ""

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
