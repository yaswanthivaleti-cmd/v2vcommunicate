from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any

class ExternalWeatherProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalWeatherProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_current_weather(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        url = f"{self.base_url}/forecast"
        params = {
            "latitude": latitude, 
            "longitude": longitude, 
            "current": "temperature_2m,wind_speed_10m,precipitation,weather_code"
        }
        return await self.fetch_async(url, params=params)
