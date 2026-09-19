from app.integrations.providers.base import BaseProvider
from app.core.logging import logger
from typing import Optional, Dict, Any

class ExternalTrafficProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalTrafficProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_current_traffic(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        # GET https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point={lat},{lon}&key={key}
        url = f"{self.base_url}/flowSegmentData/absolute/10/json"
        params = {"point": f"{latitude},{longitude}", "key": self.api_key}
        return await self.fetch_async(url, params=params)
        
    async def get_segment_traffic(self, segment_id: str) -> Optional[Dict[str, Any]]:
        # To maintain compatibility if a segment ID is passed, but for TomTom we usually query by point.
        # Fallback to demo logic or none since TomTom requires coordinates for Flow Segment.
        return None

class DemoTrafficProvider:
    """Returns raw JSON mimicking an external provider."""
    def __init__(self):
        self.name = "DemoTrafficProvider"
        
    async def get_segment_traffic(self, segment_id: str) -> Optional[Dict[str, Any]]:
        # This returns JSON that the normalizer will later parse.
        # This represents what we WOULD get from TomTom.
        return {
            "id": segment_id,
            "road": f"Road {segment_id}",
            "speed_kmh": 22.5,
            "free_flow_kmh": 40.0,
            "confidence": 0.9,
            "time": "2026-09-19T00:00:00Z"
        }
    
    async def get_current_traffic(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        return None
