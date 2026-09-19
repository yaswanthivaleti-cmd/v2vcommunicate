import threading
from typing import Dict, List, Optional
from datetime import datetime
import uuid

# In-memory storage for the Hackathon Demo
class InMemoryEmergencyRepository:
    def __init__(self):
        self.lock = threading.Lock()
        
        # In-memory collections
        self.vehicles: Dict[str, dict] = {}           # uuid -> vehicle profile
        self.presence: Dict[str, dict] = {}           # uuid -> latest presence (lat, lon, etc)
        self.events: Dict[str, dict] = {}             # event_id -> event details
        self.alerts: List[dict] = []                  # list of generated alerts
        self.sessions: Dict[str, dict] = {}           # session_id -> chat session details
        self.messages: List[dict] = []                # all chat messages
    
    # --- Presence ---
    def update_presence(self, presence_data: dict):
        with self.lock:
            uuid = presence_data["vehicle_uuid"]
            presence_data["timestamp"] = datetime.utcnow().isoformat() + "Z"
            self.presence[uuid] = presence_data
            
    def get_all_presence(self) -> List[dict]:
        with self.lock:
            return list(self.presence.values())

    # --- Events ---
    def create_event(self, event_data: dict) -> str:
        with self.lock:
            event_id = event_data.get("event_id", f"evt_{uuid.uuid4().hex[:8]}")
            event_data["event_id"] = event_id
            event_data["timestamp"] = datetime.utcnow().isoformat() + "Z"
            self.events[event_id] = event_data
            return event_id
            
    def get_event(self, event_id: str) -> Optional[dict]:
        with self.lock:
            return self.events.get(event_id)

    # --- Alerts ---
    def create_alert(self, alert_data: dict) -> str:
        with self.lock:
            alert_id = alert_data.get("alert_id", f"alt_{uuid.uuid4().hex[:8]}")
            alert_data["alert_id"] = alert_id
            self.alerts.append(alert_data)
            return alert_id
            
    def get_alerts_for_event(self, event_id: str) -> List[dict]:
        with self.lock:
            return [a for a in self.alerts if a.get("event_id") == event_id]

    # --- Sessions ---
    def create_session(self, session_data: dict) -> str:
        with self.lock:
            session_id = session_data.get("session_id", f"ses_{uuid.uuid4().hex[:8]}")
            session_data["session_id"] = session_id
            if "participants" not in session_data:
                session_data["participants"] = []
            if "created_at" not in session_data:
                session_data["created_at"] = datetime.utcnow().isoformat() + "Z"
            self.sessions[session_id] = session_data
            return session_id
            
    def get_session(self, session_id: str) -> Optional[dict]:
        with self.lock:
            return self.sessions.get(session_id)
            
    def add_participant(self, session_id: str, participant: dict):
        with self.lock:
            if session_id in self.sessions:
                # Check if already in session
                existing = [p for p in self.sessions[session_id]["participants"] if p["vehicle_uuid"] == participant["vehicle_uuid"]]
                if not existing:
                    participant["joined_at"] = datetime.utcnow().isoformat() + "Z"
                    self.sessions[session_id]["participants"].append(participant)

    def resolve_event(self, event_id: str):
        with self.lock:
            if event_id in self.events:
                self.events[event_id]["status"] = "resolved"
            # Find and resolve associated sessions
            for s_id, s_data in self.sessions.items():
                if s_data.get("event_id") == event_id:
                    s_data["status"] = "read_only"

    # --- Messages ---
    def add_message(self, message_data: dict) -> str:
        with self.lock:
            msg_id = message_data.get("message_id", f"msg_{uuid.uuid4().hex[:8]}")
            message_data["message_id"] = msg_id
            if "timestamp" not in message_data:
                message_data["timestamp"] = datetime.utcnow().isoformat() + "Z"
            self.messages.append(message_data)
            return msg_id
            
    def get_messages(self, session_id: str) -> List[dict]:
        with self.lock:
            return [m for m in self.messages if m.get("session_id") == session_id]

# Singleton instance
emergency_db = InMemoryEmergencyRepository()
