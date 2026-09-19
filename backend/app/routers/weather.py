from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.integrations.providers import weather_provider
from pydantic import BaseModel

router = APIRouter()

class WeatherSnapshotSchema(BaseModel):
    id: str
    region: str
    condition: str
    temperature_c: float
    visibility_km: float
    data_status: str
    quality: str

    class Config:
        from_attributes = True

@router.get("/{region}", response_model=WeatherSnapshotSchema)
def get_weather(region: str, db: Session = Depends(get_db)):
    weather = weather_provider.get_weather_data(db, region)
    if not weather:
        raise HTTPException(status_code=404, detail="Weather data not found")
    return weather
