from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from app.intelligence.pipeline import TrafficAIPipeline

router = APIRouter()

class Location(BaseModel):
    latitude: float
    longitude: float

class JourneyAnalyzeRequest(BaseModel):
    origin: Location
    destination: Location

@router.post("/analyze")
async def analyze_journey(req: JourneyAnalyzeRequest):
    """
    Core Intelligence Endpoint.
    Orchestrates the full data -> normalization -> intelligence pipeline.
    """
    try:
        response = await TrafficAIPipeline.analyze_journey(req.origin, req.destination)
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
