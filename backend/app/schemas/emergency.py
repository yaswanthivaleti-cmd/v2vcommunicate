from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import uuid

# --- Vehicle Presence ---
class VehiclePresence(BaseModel):
    vehicle_uuid: str
    latitude: float
    longitude: float
    heading: float
    speed: float
    timestamp: Optional[str] = None
    status: str = "active"

# --- Emergency Event ---
class VehicleEmergencyEvent(BaseModel):
    event_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    vehicle_uuid: str
    type: str
    latitude: float
    longitude: float
    heading: float
    speed_before: float
    speed_after: float
    severity: str
    timestamp: str
    status: str = "active"

# --- Alert ---
class EmergencyAlert(BaseModel):
    alert_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    type: str = "vehicle_stopped_ahead"
    distance_meters: float
    severity: str = "high"
    message: str = "A connected vehicle has stopped ahead."
    action: str = "open_chat"

# --- Chat Models ---
class EmergencyChatParticipant(BaseModel):
    vehicle_uuid: str
    role: str
    joined_at: str
    status: str = "active"

class EmergencyChatSession(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    participants: List[EmergencyChatParticipant] = []
    created_at: str
    status: str = "active"

class EmergencyChatMessage(BaseModel):
    message_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    sender_vehicle_uuid: str
    sender_role: str
    message: str
    timestamp: str
