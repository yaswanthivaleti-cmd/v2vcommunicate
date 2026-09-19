from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.integrations.providers import incident_provider
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class IncidentSchema(BaseModel):
    id: str
    title: str
    description: str
    type: str
    severity: str
    latitude: float
    longitude: float
    status: str
    data_status: str
    quality: str
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/active", response_model=List[IncidentSchema])
def get_active_incidents(segment_id: Optional[str] = None, db: Session = Depends(get_db)):
    incidents = incident_provider.get_active_incidents(db, segment_id)
    return incidents
