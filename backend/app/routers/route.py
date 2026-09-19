from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.integrations.providers import routing_provider
from pydantic import BaseModel

router = APIRouter()

class RouteSchema(BaseModel):
    id: str
    origin: str
    destination: str
    base_duration_minutes: float
    base_distance_km: float
    geometry_polyline: Optional[str] = None

    class Config:
        from_attributes = True

@router.get("/plan", response_model=List[RouteSchema])
def plan_route(origin: str, destination: str, db: Session = Depends(get_db)):
    routes = routing_provider.get_routes(db, origin, destination)
    if not routes:
        raise HTTPException(status_code=404, detail="No routes found between these locations")
    return routes
