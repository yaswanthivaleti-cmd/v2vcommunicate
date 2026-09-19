from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any, List

class ExternalIncidentProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalIncidentProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_incidents(self, min_lat: float, min_lon: float, max_lat: float, max_lon: float) -> Optional[Dict[str, Any]]:
        # GET https://api.tomtom.com/traffic/services/5/incidentDetails
        url = f"{self.base_url}/incidentDetails"
        params = {
            "bbox": f"{min_lon},{min_lat},{max_lon},{max_lat}",
            "fields": "{incidents{type,geometry{type,coordinates},properties{id,iconCategory,magnitudeOfDelay,events{description,code,iconCategory},startTime,endTime,from,to,length,delay}}}",
            "language": "en-US",
            "key": self.api_key
        }
        return await self.fetch_async(url, params=params)

class DemoIncidentProvider:
    def __init__(self):
        self.name = "DemoIncidentProvider"
        
    async def get_incidents(self, min_lat: float, min_lon: float, max_lat: float, max_lon: float) -> Optional[Dict[str, Any]]:
        # Simulate TomTom's JSON structure
        return {
            "incidents": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [(min_lon + max_lon) / 2, (min_lat + max_lat) / 2]
                    },
                    "properties": {
                        "id": "inc_001",
                        "iconCategory": 1,
                        "magnitudeOfDelay": 2,
                        "events": [{"description": "Accident in right lane", "code": 111, "iconCategory": 1}],
                        "delay": 300
                    }
                }
            ]
        }
