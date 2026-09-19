from app.config import settings
from app.integrations.providers.traffic import ExternalTrafficProvider, DemoTrafficProvider
from app.integrations.providers.weather import ExternalWeatherProvider, DemoWeatherProvider
from app.integrations.providers.incident import ExternalIncidentProvider, DemoIncidentProvider
from app.integrations.providers.routing import ExternalRoutingProvider, DemoRoutingProvider
from app.integrations.providers.location import LocationProvider

class ProviderFactory:
    """Selects and instantiates providers based on DEMO_MODE setting."""
    
    @staticmethod
    def get_traffic_provider():
        if settings.DEMO_MODE:
            return DemoTrafficProvider()
        return ExternalTrafficProvider(settings.TRAFFIC_API_BASE_URL, settings.TRAFFIC_API_KEY)

    @staticmethod
    def get_weather_provider():
        if settings.DEMO_MODE:
            return DemoWeatherProvider()
        return ExternalWeatherProvider(settings.WEATHER_API_BASE_URL, settings.WEATHER_API_KEY)

    @staticmethod
    def get_incident_provider():
        if settings.DEMO_MODE:
            return DemoIncidentProvider()
        return ExternalIncidentProvider(settings.INCIDENT_API_BASE_URL, settings.INCIDENT_API_KEY)

    @staticmethod
    def get_routing_provider():
        if settings.DEMO_MODE:
            return DemoRoutingProvider()
        return ExternalRoutingProvider(settings.ROUTING_API_BASE_URL, settings.ROUTING_API_KEY)

    @staticmethod
    def get_location_provider():
        return LocationProvider()
