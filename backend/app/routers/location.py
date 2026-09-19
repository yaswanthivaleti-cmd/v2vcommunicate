from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.integrations.factory import ProviderFactory

router = APIRouter()

class LocationRequest(BaseModel):
    latitude: float
    longitude: float

@router.post("")
def validate_location(req: LocationRequest):
    """Validates user location coordinates."""
    provider = ProviderFactory.get_location_provider()
    
    if not provider.validate_coordinates(req.latitude, req.longitude):
        raise HTTPException(status_code=400, detail="Invalid coordinates.")
        
    return {"status": "success", "message": "Location validated.", "location": req.model_dump()}
