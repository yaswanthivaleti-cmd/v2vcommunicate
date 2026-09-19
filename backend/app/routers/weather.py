from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.observation import WeatherObservation
from app.integrations.factory import ProviderFactory
from app.integrations.normalization.weather_normalizer import WeatherNormalizer

router = APIRouter()

@router.get("/current")
async def get_current_weather(
    latitude: float = Query(..., description="Latitude"),
    longitude: float = Query(..., description="Longitude"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    provider = ProviderFactory.get_weather_provider()
    raw_weather = await provider.get_current_weather(latitude, longitude)
    
    if not raw_weather:
        raise HTTPException(status_code=404, detail="Weather data unavailable for this location.")
        
    weather = WeatherNormalizer.normalize(raw_weather, provider.name, is_live=True)
    
    # Store observation in DB
    observation = WeatherObservation(
        latitude=latitude,
        longitude=longitude,
        temperature=weather["temperature_c"],
        condition=weather["condition"],
        provider=provider.name
    )
    db.add(observation)
    db.commit()
    
    return weather
