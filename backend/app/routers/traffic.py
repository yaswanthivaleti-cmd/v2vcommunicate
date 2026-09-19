from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.observation import TrafficObservation
from app.integrations.factory import ProviderFactory
from app.integrations.normalization.traffic_normalizer import TrafficNormalizer

router = APIRouter()

@router.get("/current")
async def get_current_traffic(
    latitude: float = Query(..., description="Latitude"),
    longitude: float = Query(..., description="Longitude"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    provider = ProviderFactory.get_traffic_provider()
    raw_traffic = await provider.get_current_traffic(latitude, longitude)
    
    if not raw_traffic:
        raise HTTPException(status_code=404, detail="Traffic data unavailable for this location.")
        
    traffic = TrafficNormalizer.normalize(raw_traffic, provider.name, is_live=True)
    
    # Store observation in DB
    observation = TrafficObservation(
        latitude=latitude,
        longitude=longitude,
        current_speed=traffic["current_speed"],
        free_flow_speed=traffic["free_flow_speed"],
        congestion_ratio=traffic["current_speed"] / max(traffic["free_flow_speed"], 1),
        provider=provider.name
    )
    db.add(observation)
    db.commit()
    
    return traffic
