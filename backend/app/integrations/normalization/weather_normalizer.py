from typing import Dict, Any, Optional
from datetime import datetime

class WeatherNormalizer:
    @staticmethod
    def normalize(raw_data: Optional[Dict[str, Any]], provider_name: str, is_live: bool) -> Dict[str, Any]:
        """Normalizes external weather API response into internal format."""
        
        if raw_data is None:
            return {
                "data_status": "unavailable",
                "quality": "poor",
                "source": provider_name
            }

        if provider_name == "DemoWeatherProvider":
            return {
                "temperature": raw_data.get("temp", 0),
                "precipitation": raw_data.get("precip", 0),
                "precipitation_probability": raw_data.get("precip_prob", 0),
                "wind_speed": raw_data.get("wind", 0),
                "visibility": raw_data.get("visibility", 10),
                "condition": raw_data.get("cond", "clear"),
                "timestamp": datetime.utcnow().isoformat(),
                "source": provider_name,
                "data_status": "simulated",
                "quality": "good"
            }
            
        elif provider_name == "ExternalWeatherProvider":
            # Parsing logic for Open-Meteo current conditions
            current = raw_data.get("current", {})
            
            # Very basic WMO code mapping for display purposes
            code = current.get("weather_code", 0)
            condition = "clear"
            if code in [1, 2, 3]: condition = "partly_cloudy"
            elif code in [51, 53, 55, 61, 63, 65, 80, 81, 82]: condition = "rain"
            elif code in [71, 73, 75, 85, 86]: condition = "snow"
            elif code in [95, 96, 99]: condition = "thunderstorm"
            
            return {
                "temperature": current.get("temperature_2m", 0.0),
                "precipitation": current.get("precipitation", 0.0),
                "precipitation_probability": 0.0, # Not in Open-Meteo current endpoint by default
                "wind_speed": current.get("wind_speed_10m", 0.0),
                "visibility": 10.0, # Often omitted or separate
                "condition": condition,
                "timestamp": datetime.utcnow().isoformat(),
                "source": "Open-Meteo",
                "data_status": "live" if is_live else "cached",
                "quality": "good" if "temperature_2m" in current else "degraded"
            }
            
        return {
            "data_status": "unavailable",
            "quality": "poor",
            "source": provider_name
        }
