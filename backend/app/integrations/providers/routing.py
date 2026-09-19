from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any, List

class ExternalRoutingProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalRoutingProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_routes(self, origin: str, destination: str) -> Optional[List[Dict[str, Any]]]:
        url = f"{self.base_url}/routes"
        params = {"origin": origin, "destination": destination, "key": self.api_key}
        return await self.fetch_async(url, params=params)

class DemoRoutingProvider:
    def __init__(self):
        self.name = "DemoRoutingProvider"
        
    async def get_routes(self, origin: str, destination: str) -> Optional[List[Dict[str, Any]]]:
        return [
            {
                "id": "route_demo_1",
                "dist": 12400, # meters
                "dur": 1680, # seconds
                "path": [],
                "segs": ["seg_1", "seg_2"],
                "toll": 0
            }
        ]
