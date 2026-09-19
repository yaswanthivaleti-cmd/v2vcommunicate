import asyncio
from typing import Dict, Any, List

from app.integrations.factory import ProviderFactory
from app.integrations.normalization.traffic_normalizer import TrafficNormalizer
from app.integrations.normalization.weather_normalizer import WeatherNormalizer
from app.integrations.normalization.incident_normalizer import IncidentNormalizer
from app.integrations.normalization.routing_normalizer import RoutingNormalizer

from app.intelligence.congestion import CongestionEngine
from app.intelligence.trend import TrendEngine
from app.intelligence.weather_impact import WeatherImpactEngine
from app.intelligence.incident_impact import IncidentImpactEngine
from app.intelligence.prediction import RuleBasedPredictionEngine
from app.intelligence.journey import JourneyImpactEngine
from app.intelligence.decision import RouteDecisionEngine
from app.intelligence.recommendation import RecommendationEngine

class TrafficAIPipeline:
    """Orchestrates the entire data -> intelligence -> decision pipeline."""
    
    @staticmethod
    async def analyze_journey(origin: Any, destination: Any, user_preference: str = "FASTEST") -> Dict[str, Any]:
        # 1. Initialize Providers
        traffic_provider = ProviderFactory.get_traffic_provider()
        weather_provider = ProviderFactory.get_weather_provider()
        incident_provider = ProviderFactory.get_incident_provider()
        routing_provider = ProviderFactory.get_routing_provider()
        
        # 2. Fetch Data (Concurrent for performance)
        # Note: In reality, we need routes first to know which segments to query for traffic.
        # For this prototype structure, we'll fetch routes first.
        # Extract coordinates
        origin_lat = getattr(origin, 'latitude', origin.get('latitude') if isinstance(origin, dict) else 28.6139)
        origin_lng = getattr(origin, 'longitude', origin.get('longitude') if isinstance(origin, dict) else 77.2090)
        dest_lat = getattr(destination, 'latitude', destination.get('latitude') if isinstance(destination, dict) else 28.6200)
        dest_lng = getattr(destination, 'longitude', destination.get('longitude') if isinstance(destination, dict) else 77.2300)

        raw_routes = await routing_provider.get_routes(origin_lat, origin_lng, dest_lat, dest_lng)
        routes = RoutingNormalizer.normalize(raw_routes, routing_provider.name, is_live=True)
        
        if not routes:
            raise ValueError("No routes found.")
            
        primary_route = routes[0]
        segments = primary_route.get("segments", [])
        
        # Fetch remaining context concurrently
        # Use the extracted origin coordinates for contextual data fetching
        lat, lon = origin_lat, origin_lng
            
        raw_traffic_task = traffic_provider.get_current_traffic(lat, lon)
        raw_weather_task = weather_provider.get_current_weather(lat, lon)
        raw_incidents_task = incident_provider.get_incidents_in_bbox(lat-0.1, lon-0.1, lat+0.1, lon+0.1)
        
        raw_traffic, raw_weather, raw_incidents = await asyncio.gather(
            raw_traffic_task, raw_weather_task, raw_incidents_task
        )
        
        # 3. Normalize Data
        traffic = TrafficNormalizer.normalize(raw_traffic, traffic_provider.name, is_live=True)
        weather = WeatherNormalizer.normalize(raw_weather, weather_provider.name, is_live=True)
        incidents = IncidentNormalizer.normalize(raw_incidents, incident_provider.name, is_live=True)
        
        # 4. Intelligence Engine - Analysis
        congestion = CongestionEngine.calculate(traffic["current_speed"], traffic["free_flow_speed"])
        trend = TrendEngine.calculate([traffic["current_speed"]]) # Simplification
        weather_impact = WeatherImpactEngine.calculate(weather)
        incident_impact = IncidentImpactEngine.calculate(incidents, segments)
        
        # 5. Prediction
        prediction = RuleBasedPredictionEngine.predict(
            current_speed=traffic["current_speed"],
            trend=trend,
            congestion_score=congestion["score"],
            weather_impact=weather_impact["score"],
            incident_impact=incident_impact["impact_score"]
        )
        
        # 6. Journey Impact & Decision
        analyzed_routes = []
        for r in routes:
            impact = JourneyImpactEngine.calculate(
                r, prediction, traffic["current_speed"], traffic["free_flow_speed"]
            )
            analyzed_routes.append({
                "route": r,
                "journey_impact": impact
            })
            
        analyzed_routes = RouteDecisionEngine.compare(analyzed_routes)
        
        # 7. Recommendation
        recommendation = RecommendationEngine.generate(analyzed_routes, user_preference=user_preference)
        
        # 8. Compile Response
        # Following the strict JSON structure requested
        return {
            "data_status": "live" if traffic["data_status"] == "live" else "simulated",
            "current_conditions": {
                "congestion_level": congestion["level"],
                "congestion_score": congestion["score"],
                "trend": trend,
                "speed": traffic["current_speed"]
            },
            "weather": weather,
            "incidents": incidents,
            "prediction": prediction,
            "journey_impact": analyzed_routes[0]["journey_impact"], # Primary route impact
            "routes": analyzed_routes,
            "recommendation": recommendation,
            "alerts": [] # Handled by alert engine if added
        }
