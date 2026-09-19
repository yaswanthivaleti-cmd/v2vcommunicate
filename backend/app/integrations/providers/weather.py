from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any

class ExternalWeatherProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalWeatherProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_weather(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        # GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,precipitation,weather_code,wind_speed_10m
        url = f"{self.base_url}/forecast"
        params = {
            "latitude": latitude, 
            "longitude": longitude, 
            "current": "temperature_2m,precipitation,weather_code,wind_speed_10m"
        }
        return await self.fetch_async(url, params=params)

class DemoWeatherProvider:
    def __init__(self):
        self.name = "DemoWeatherProvider"
        
    async def get_weather(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        return {
            "temp": 24,
            "precip": 0.4,
            "precip_prob": 60,
            "wind": 12,
            "visibility": 5,
            "cond": "light_rain"
        }
