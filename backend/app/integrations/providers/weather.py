from app.integrations.providers.base import BaseProvider
from typing import Optional, Dict, Any

class ExternalWeatherProvider(BaseProvider):
    def __init__(self, base_url: str, api_key: str):
        super().__init__("ExternalWeatherProvider")
        self.base_url = base_url
        self.api_key = api_key

    async def get_current_weather(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        # GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        url = f"{self.base_url}/weather"
        params = {"lat": latitude, "lon": longitude, "appid": self.api_key, "units": "metric"}
        return await self.fetch_async(url, params=params)
