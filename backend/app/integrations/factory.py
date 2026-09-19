from app.config import settings
from app.integrations.providers.traffic import ExternalTrafficProvider
from app.integrations.providers.weather import ExternalWeatherProvider
from app.integrations.providers.incident import ExternalIncidentProvider
from app.integrations.providers.routing import ExternalRoutingProvider
from app.integrations.providers.location import LocationProvider

class ProviderFactory:
    """Instantiates external providers (demo mode has been fully deprecated)."""
    
    @staticmethod
    def get_traffic_provider():
        return ExternalTrafficProvider(settings.TRAFFIC_API_BASE_URL, settings.TRAFFIC_API_KEY)

    @staticmethod
    def get_weather_provider():
        return ExternalWeatherProvider(settings.WEATHER_API_BASE_URL, settings.WEATHER_API_KEY)

    @staticmethod
    def get_incident_provider():
        return ExternalIncidentProvider(settings.INCIDENT_API_BASE_URL, settings.INCIDENT_API_KEY)

    @staticmethod
    def get_routing_provider():
        return ExternalRoutingProvider(settings.ROUTING_API_BASE_URL, settings.ROUTING_API_KEY)

    @staticmethod
    def get_location_provider():
        return LocationProvider()
