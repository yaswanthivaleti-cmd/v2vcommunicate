from typing import Dict, Any, List, Optional

class RoutingNormalizer:
    @staticmethod
    def normalize(raw_data: Optional[List[Dict[str, Any]]], provider_name: str, is_live: bool) -> List[Dict[str, Any]]:
        """Normalizes external routing API response into internal format."""
        if raw_data is None:
            return []

        normalized = []
        for route in raw_data:
            if provider_name == "DemoRoutingProvider":
                normalized.append({
                    "route_id": route.get("id"),
                    "distance_km": route.get("dist", 0) / 1000.0,
                    "base_eta_minutes": route.get("dur", 0) / 60.0,
                    "geometry": route.get("path", []),
                    "segments": route.get("segs", []),
                    "toll": route.get("toll", 0),
                    "source": provider_name,
                    "data_status": "simulated",
                    "quality": "good"
                })
            elif provider_name == "ExternalRoutingProvider":
                normalized.append({
                    "route_id": route.get("id", "external_route"),
                    "distance_km": route.get("distanceMeters", 0) / 1000.0,
                    "base_eta_minutes": int(route.get("duration", "0s").replace("s", "")) / 60.0,
                    "geometry": route.get("polyline", {}).get("encodedPolyline", ""),
                    "segments": [],
                    "toll": route.get("travelAdvisory", {}).get("tollInfo", {}).get("estimatedPrice", []) != [],
                    "source": provider_name,
                    "data_status": "live" if is_live else "cached",
                    "quality": "good"
                })
                
        return normalized
