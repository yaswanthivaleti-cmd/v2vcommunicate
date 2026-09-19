from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any

class ExternalIncidentProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalIncidentProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_incidents_in_bbox(self, min_lat: float, min_lng: float, max_lat: float, max_lng: float) -> Optional[Dict[str, Any]]:
        # Example TomTom Incident call
        url = f"{self.base_url}/incidentDetails"
        params = {"bbox": f"{min_lng},{min_lat},{max_lng},{max_lat}", "key": self.api_key}
        return await self.fetch_async(url, params=params)
