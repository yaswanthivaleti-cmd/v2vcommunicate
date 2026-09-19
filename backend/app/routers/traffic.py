from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any
from app.integrations.factory import ProviderFactory
from app.integrations.normalization.traffic_normalizer import TrafficNormalizer
from app.integrations.providers import traffic_provider
from app.models.traffic import Corridor, RoadSegment, TrafficSnapshot
from pydantic import BaseModel

router = APIRouter()

class TrafficSnapshotSchema(BaseModel):
    id: str
    current_speed: float
    free_flow_speed: float
    congestion_level: str
    data_status: str
    quality: str
    
    class Config:
        from_attributes = True

class SegmentSchema(BaseModel):
    id: str
    name: str
    start_lat: float
    start_lng: float
    end_lat: float
    end_lng: float
    length_meters: float
    traffic: TrafficSnapshotSchema = None

    class Config:
        from_attributes = True

class CorridorSchema(BaseModel):
    id: str
    name: str
    description: str
    segments: List[SegmentSchema] = []

    class Config:
        from_attributes = True

@router.get("/corridors", response_model=List[CorridorSchema])
def get_corridors(db: Session = Depends(get_db)):
    corridors = db.query(Corridor).all()
    result = []
    for c in corridors:
        segments = []
        for s in c.segments:
            # Fetch latest traffic snapshot via provider
            traffic = traffic_provider.get_traffic_data(db, s.id)
            seg_data = SegmentSchema.model_validate(s).model_dump()
            if traffic:
                seg_data["traffic"] = TrafficSnapshotSchema.model_validate(traffic).model_dump()
            segments.append(seg_data)
        
        c_data = CorridorSchema.model_validate(c).model_dump()
        c_data["segments"] = segments
        result.append(c_data)
    return result

@router.get("/segments/{segment_id}/traffic", response_model=TrafficSnapshotSchema)
def get_segment_traffic(segment_id: str, db: Session = Depends(get_db)):
    traffic = traffic_provider.get_traffic_data(db, segment_id)
    if not traffic:
        raise HTTPException(status_code=404, detail="Traffic data not found")
    return traffic
