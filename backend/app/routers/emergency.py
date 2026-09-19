import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from typing import List

from app.schemas.emergency import (
    VehiclePresence, VehicleEmergencyEvent, EmergencyAlert,
    EmergencyChatSession, EmergencyChatParticipant, EmergencyChatMessage
)
from app.models.emergency_repository import emergency_db
from app.services.nearby_vehicle_service import nearby_vehicle_service
from app.services.emergency_chat_manager import chat_manager
from datetime import datetime

router = APIRouter()

# 1. Presence
@router.post("/presence", response_model=dict)
def update_presence(presence: VehiclePresence):
    emergency_db.update_presence(presence.dict())
    
    # After updating presence, return any active alerts for this vehicle
    # (In a real system, you'd filter alerts by relevance, but for MVP we check all alerts and re-filter based on distance)
    # Actually, the alert generation should happen when the event is triggered, targeting specific vehicles.
    # To keep the demo simple, if an alert is created targeting this vehicle, the client can fetch it.
    
    return {"status": "success", "storage_mode": "in_memory", "data_status": "demo"}

# 2. Trigger Event
@router.post("/events", response_model=dict)
def trigger_event(event: VehicleEmergencyEvent):
    event_dict = event.dict()
    event_id = emergency_db.create_event(event_dict)
    
    # Find nearby relevant vehicles
    relevant_vehicles = nearby_vehicle_service.find_relevant_vehicles(
        event_lat=event.latitude,
        event_lon=event.longitude,
        event_heading=event.heading,
        originator_uuid=event.vehicle_uuid
    )
    
    generated_alerts = []
    
    for v in relevant_vehicles:
        alert = EmergencyAlert(
            event_id=event_id,
            distance_meters=v["distance_meters"]
        )
        alert_dict = alert.dict()
        alert_dict["target_vehicle_uuid"] = v["vehicle_uuid"]
        alert_id = emergency_db.create_alert(alert_dict)
        generated_alerts.append(alert_dict)

    return {
        "event_id": event_id,
        "notified_vehicles": len(relevant_vehicles),
        "alerts": generated_alerts
    }

# Endpoint for a vehicle to poll its alerts
@router.get("/alerts/{vehicle_uuid}", response_model=List[dict])
def get_alerts(vehicle_uuid: str):
    # Hackathon demo: find alerts targeted to this UUID where the event is still active
    active_alerts = []
    for alert in emergency_db.alerts:
        if alert.get("target_vehicle_uuid") == vehicle_uuid:
            event = emergency_db.get_event(alert["event_id"])
            if event and event["status"] == "active":
                active_alerts.append(alert)
    return active_alerts

# 3. Create Session
class CreateSessionRequest(BaseModel):
    event_id: str
    vehicle_uuid: str
    role: str = "responder"

@router.post("/sessions", response_model=dict)
def create_or_join_session(req: CreateSessionRequest):
    event = emergency_db.get_event(req.event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    if event["status"] != "active":
        raise HTTPException(status_code=400, detail="Event is not active")

    # Find existing session for this event
    session_id = None
    for s_id, s_data in emergency_db.sessions.items():
        if s_data.get("event_id") == req.event_id:
            session_id = s_id
            break
            
    if not session_id:
        # Create new session
        session = EmergencyChatSession(event_id=req.event_id)
        session_id = emergency_db.create_session(session.dict())
        
        # Add the originator to the session
        originator_uuid = event["vehicle_uuid"]
        emergency_db.add_participant(session_id, {
            "vehicle_uuid": originator_uuid,
            "role": "reporter",
            "status": "active"
        })

    # Add the joining vehicle
    emergency_db.add_participant(session_id, {
        "vehicle_uuid": req.vehicle_uuid,
        "role": req.role,
        "status": "active"
    })
    
    return {"session_id": session_id}

@router.get("/sessions/{session_id}", response_model=dict)
def get_session(session_id: str):
    session = emergency_db.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    messages = emergency_db.get_messages(session_id)
    return {"session": session, "messages": messages}

# 4. Resolve Event
@router.post("/events/{event_id}/resolve")
def resolve_event(event_id: str):
    emergency_db.resolve_event(event_id)
    
    # Notify all sessions related to this event
    for s_id, s_data in emergency_db.sessions.items():
        if s_data.get("event_id") == event_id:
            import asyncio
            asyncio.create_task(chat_manager.broadcast_to_session(s_id, {
                "type": "system",
                "message": "Emergency session ended.",
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }))
            
    return {"status": "resolved"}

# 5. WebSocket Chat
@router.websocket("/ws/{session_id}/{vehicle_uuid}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, vehicle_uuid: str):
    session = emergency_db.get_session(session_id)
    if not session:
        await websocket.close(code=1008, reason="Session not found")
        return
        
    if session["status"] != "active":
        await websocket.close(code=1008, reason="Session is no longer active")
        return
        
    participant = next((p for p in session["participants"] if p["vehicle_uuid"] == vehicle_uuid), None)
    if not participant:
        await websocket.close(code=1008, reason="Unauthorized participant")
        return

    await chat_manager.connect(websocket, session_id)
    
    # Broadcast join
    await chat_manager.broadcast_to_session(session_id, {
        "type": "system",
        "message": f"{participant['role'].capitalize()} joined the session.",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

    try:
        while True:
            data = await websocket.receive_text()
            
            # Validate session active
            session = emergency_db.get_session(session_id)
            if session["status"] != "active":
                await websocket.send_text(json.dumps({
                    "type": "system",
                    "message": "Session is read-only.",
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }))
                continue

            try:
                payload = json.loads(data)
                message_text = payload.get("message", "").strip()
                if not message_text or len(message_text) > 500:
                    continue # Ignore invalid
                    
                msg = EmergencyChatMessage(
                    session_id=session_id,
                    sender_vehicle_uuid=vehicle_uuid,
                    sender_role=participant["role"],
                    message=message_text,
                    timestamp=datetime.utcnow().isoformat() + "Z"
                )
                msg_dict = msg.dict()
                emergency_db.add_message(msg_dict)
                
                # Format for frontend
                broadcast_payload = {
                    "type": "chat_message",
                    "message_id": msg_dict["message_id"],
                    "session_id": session_id,
                    "sender_vehicle_uuid": vehicle_uuid,
                    "sender_role": participant["role"],
                    "message": message_text,
                    "timestamp": msg_dict["timestamp"]
                }
                
                await chat_manager.broadcast_to_session(session_id, broadcast_payload)
            except json.JSONDecodeError:
                pass
                
    except WebSocketDisconnect:
        chat_manager.disconnect(websocket, session_id)
        await chat_manager.broadcast_to_session(session_id, {
            "type": "system",
            "message": f"{participant['role'].capitalize()} left the session.",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })
