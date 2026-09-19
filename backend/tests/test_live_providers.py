import pytest
import respx
import httpx
from datetime import datetime
from app.integrations.providers.traffic import ExternalTrafficProvider
from app.integrations.normalization.traffic_normalizer import TrafficNormalizer
from app.integrations.providers.incident import ExternalIncidentProvider
from app.integrations.normalization.incident_normalizer import IncidentNormalizer
from app.integrations.providers.weather import ExternalWeatherProvider
from app.integrations.normalization.weather_normalizer import WeatherNormalizer

@pytest.mark.asyncio
@respx.mock
async def test_tomtom_traffic_flow():
    provider = ExternalTrafficProvider("https://api.tomtom.com", "fakekey")
    
    # Mock the TomTom Flow Segment Data response
    respx.get("https://api.tomtom.com/flowSegmentData/absolute/10/json", params={"point": "28.6,77.2", "key": "fakekey"}).respond(
        status_code=200,
        json={
            "flowSegmentData": {
                "currentSpeed": 45,
                "freeFlowSpeed": 60,
                "currentTravelTime": 120,
                "freeFlowTravelTime": 90,
                "confidence": 0.89,
                "roadClosure": False
            }
        }
    )
    
    raw = await provider.get_current_traffic(28.6, 77.2)
    normalized = TrafficNormalizer.normalize(raw, provider.name, is_live=True)
    
    assert normalized["data_status"] == "live"
    assert normalized["current_speed"] == 45
    assert normalized["free_flow_speed"] == 60
    assert normalized["source"] == "TomTom"

@pytest.mark.asyncio
@respx.mock
async def test_tomtom_incidents():
    provider = ExternalIncidentProvider("https://api.tomtom.com", "fakekey")
    
    respx.get("https://api.tomtom.com/incidentDetails").respond(
        status_code=200,
        json={
            "incidents": [
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [77.2, 28.6]},
                    "properties": {
                        "id": "123",
                        "magnitudeOfDelay": 3,
                        "events": [{"description": "Accident", "code": 111, "iconCategory": 1}]
                    }
                }
            ]
        }
    )
    
    raw = await provider.get_incidents(28.5, 77.1, 28.7, 77.3)
    normalized = IncidentNormalizer.normalize(raw, provider.name, is_live=True)
    
    assert len(normalized) == 1
    assert normalized[0]["data_status"] == "live"
    assert normalized[0]["severity"] == "high"
    assert normalized[0]["description"] == "Accident"
    assert normalized[0]["confirmation_status"] == "Possible Incident Detected"

@pytest.mark.asyncio
@respx.mock
async def test_openmeteo_weather():
    provider = ExternalWeatherProvider("https://api.open-meteo.com", "")
    
    respx.get("https://api.open-meteo.com/forecast").respond(
        status_code=200,
        json={
            "current": {
                "temperature_2m": 25.5,
                "precipitation": 2.0,
                "weather_code": 61,
                "wind_speed_10m": 12.0
            }
        }
    )
    
    raw = await provider.get_weather(28.6, 77.2)
    normalized = WeatherNormalizer.normalize(raw, provider.name, is_live=True)
    
    assert normalized["data_status"] == "live"
    assert normalized["temperature"] == 25.5
    assert normalized["condition"] == "rain" # 61 maps to rain
