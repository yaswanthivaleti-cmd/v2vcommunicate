import json
from typing import Dict, List
from fastapi import WebSocket

class EmergencyChatManager:
    def __init__(self):
        # Maps session_id -> list of WebSockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        if session_id not in self.active_connections:
            self.active_connections[session_id] = []
        self.active_connections[session_id].append(websocket)

    def disconnect(self, websocket: WebSocket, session_id: str):
        if session_id in self.active_connections:
            if websocket in self.active_connections[session_id]:
                self.active_connections[session_id].remove(websocket)
            if len(self.active_connections[session_id]) == 0:
                del self.active_connections[session_id]

    async def broadcast_to_session(self, session_id: str, message: dict):
        if session_id in self.active_connections:
            message_str = json.dumps(message)
            for connection in self.active_connections[session_id]:
                try:
                    await connection.send_text(message_str)
                except Exception as e:
                    print(f"Error sending message to {session_id}: {e}")

chat_manager = EmergencyChatManager()
