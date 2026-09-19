from typing import Dict, Any, Optional
from datetime import datetime

class TrafficNormalizer:
    @staticmethod
    def normalize(raw_data: Optional[Dict[str, Any]], provider_name: str, is_live: bool) -> Dict[str, Any]:
        """Normalizes external traffic API response into internal format."""
        
        # If the provider failed or timed out
        if raw_data is None:
            return {
                "data_status": "unavailable",
                "quality": "poor",
                "source": provider_name
            }

        # Mocking extraction logic based on the provider
        if provider_name == "DemoTrafficProvider":
            return {
                "road_segment_id": raw_data.get("id"),
                "road_name": raw_data.get("road"),
                "current_speed": raw_data.get("speed_kmh", 0),
                "free_flow_speed": raw_data.get("free_flow_kmh", 0),
                "expected_speed": raw_data.get("free_flow_kmh", 0) * 0.8,
                "vehicle_count": None,
                "timestamp": raw_data.get("time"),
                "source": provider_name,
                "data_status": "simulated",
                "quality": "good"
            }
            
        elif provider_name == "ExternalTrafficProvider":
            # Real parsing logic for TomTom Flow Segment Data
            flow_data = raw_data.get("flowSegmentData", {})
            return {
                "road_segment_id": "unknown", # Coordinate-based request doesn't return segment ID
                "road_name": "Unknown Road", # TomTom flow segment often omits road name without Reverse Geocoding
                "current_speed": flow_data.get("currentSpeed", 0),
                "free_flow_speed": flow_data.get("freeFlowSpeed", 0),
                "expected_speed": flow_data.get("currentSpeed", 0), # No expected, use current
                "vehicle_count": None,
                "timestamp": datetime.utcnow().isoformat(),
                "road_closure": flow_data.get("roadClosure", False),
                "confidence": flow_data.get("confidence", 1.0),
                "source": "TomTom",
                "data_status": "live" if is_live else "cached",
                "quality": "good" if flow_data.get("currentSpeed") is not None else "degraded"
            }
            
        # Default fallback
        return {
            "data_status": "unavailable",
            "quality": "poor",
            "source": provider_name
        }
