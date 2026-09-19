from typing import Dict, Any, List, Optional

class RoutingNormalizer:
    @staticmethod
    def normalize(raw_data: Optional[Any], provider_name: str, is_live: bool) -> List[Dict[str, Any]]:
        """Normalizes external routing API response into internal format."""
        if not raw_data:
            return []

        normalized = []
        
        # Handle TomTom format
        if isinstance(raw_data, dict) and "routes" in raw_data:
            for idx, route in enumerate(raw_data["routes"]):
                summary = route.get("summary", {})
                
                normalized.append({
                    "route_id": f"tomtom_route_{idx}",
                    "distance_km": summary.get("lengthInMeters", 0) / 1000.0,
                    "distance_meters": summary.get("lengthInMeters", 0),
                    "base_eta_minutes": summary.get("travelTimeInSeconds", 0) / 60.0,
                    "current_eta_seconds": summary.get("travelTimeInSeconds", 0),
                    "geometry": "", # Geometry could be parsed from legs/points if needed
                    "segments": [],
                    "toll": summary.get("noToll", False) == False,
                    "source": provider_name,
                    "data_status": "live" if is_live else "cached",
                    "quality": "good"
                })
        else:
            # Fallback for mock or other formats
            routes_list = raw_data if isinstance(raw_data, list) else []
            for idx, route in enumerate(routes_list):
                if isinstance(route, dict):
                    normalized.append({
                        "route_id": route.get("id", f"route_{idx}"),
                        "distance_km": route.get("distanceMeters", 0) / 1000.0,
                        "distance_meters": route.get("distanceMeters", 0),
                        "base_eta_minutes": int(str(route.get("duration", "0s")).replace("s", "")) / 60.0 if "duration" in route else 0,
                        "current_eta_seconds": int(str(route.get("duration", "0s")).replace("s", "")) if "duration" in route else 0,
                        "geometry": route.get("polyline", {}).get("encodedPolyline", ""),
                        "segments": [],
                        "toll": False,
                        "source": provider_name,
                        "data_status": "live" if is_live else "cached",
                        "quality": "good"
                    })
                
        return normalized
