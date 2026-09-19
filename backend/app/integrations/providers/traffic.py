from app.integrations.providers.base import BaseProvider
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
