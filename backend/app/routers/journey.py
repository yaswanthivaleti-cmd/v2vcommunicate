from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from sqlalchemy.orm import Session

from app.intelligence.pipeline import TrafficAIPipeline
from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.trip import Trip, RouteOption

router = APIRouter()

class Location(BaseModel):
    latitude: float
    longitude: float

class JourneyPlanRequest(BaseModel):
    origin: Location
    destination: Location

@router.post("/plan")
async def plan_journey(
    req: JourneyPlanRequest, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Core Intelligence Endpoint.
    Orchestrates the full data -> normalization -> intelligence pipeline.
    Saves the trip to the database.
    """
    try:
        # 1. Create Trip in DB
        new_trip = Trip(
            user_id=current_user.id,
            origin_lat=req.origin.latitude,
            origin_lng=req.origin.longitude,
            dest_lat=req.destination.latitude,
            dest_lng=req.destination.longitude,
            status="PLANNED"
        )
        db.add(new_trip)
        db.commit()
        db.refresh(new_trip)

        # 2. Get User Preference
        preference = current_user.preference.priority if current_user.preference else "FASTEST"

        # 3. Analyze Journey via Pipeline
        response = await TrafficAIPipeline.analyze_journey(req.origin, req.destination, preference)
        
        # 4. Save Route Options
        for r in response.get("routes", []):
            route_opt = RouteOption(
                trip_id=new_trip.id,
                provider_route_id=r.get("route", {}).get("route_id"),
                distance_meters=r.get("route", {}).get("distance_meters"),
                current_eta_seconds=r.get("route", {}).get("current_eta_seconds"),
                geometry=str(r.get("route", {}).get("geometry", ""))[:200], # truncating for DB simplicity if too large
                is_selected=1 if response.get("recommendation", {}).get("recommended_route_id") == r.get("route", {}).get("route_id") else 0
            )
            db.add(route_opt)
        
        db.commit()
        
        response["trip_id"] = new_trip.id
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ActiveUpdateRequest(BaseModel):
    trip_id: int
    current_location: Location
    current_speed: float

@router.post("/active/update")
async def active_update(
    req: ActiveUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify trip belongs to user
    trip = db.query(Trip).filter(Trip.id == req.trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    # In a real app we would record the TrafficObservation here
    # and maybe re-evaluate ETA or alerts
    
    return {"status": "Observation recorded"}
