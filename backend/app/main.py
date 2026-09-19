from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.core.logging import logger

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import journey, emergency, auth, traffic, weather

# The auth router should be registered.
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(traffic.router, prefix=f"{settings.API_V1_STR}/traffic", tags=["Traffic"])
app.include_router(weather.router, prefix=f"{settings.API_V1_STR}/weather", tags=["Weather"])
app.include_router(journey.router, prefix=f"{settings.API_V1_STR}/journey", tags=["Journey"])
app.include_router(emergency.router, prefix=f"{settings.API_V1_STR}/emergency", tags=["Emergency"])
# app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["Dashboard"])
# app.include_router(settings_router.router, prefix=f"{settings.API_V1_STR}/settings", tags=["Settings"])
# app.include_router(telemetry.router, prefix=f"{settings.API_V1_STR}/telemetry", tags=["Telemetry"])
# app.include_router(location.router, prefix=f"{settings.API_V1_STR}/location", tags=["Location"])
# app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics"])





@app.get("/")
def root():
    return {"message": "Welcome to TrafficAI Backend API", "status": "online"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

