from typing import Dict, Any, List, Optional
from datetime import datetime

class IncidentNormalizer:
    @staticmethod
    def normalize(raw_data: Optional[Dict[str, Any]], provider_name: str, is_live: bool) -> List[Dict[str, Any]]:
        """Normalizes external incident API response into internal format."""
        if raw_data is None:
            return []

        normalized = []
        incidents = raw_data.get("incidents", [])
        for incident in incidents:
            if provider_name == "DemoIncidentProvider":
                normalized.append({
                    "road_segment_id": None,
                    "type": incident.get("type", "unknown"),
                    "severity": incident.get("severity", "unknown"),
                    "latitude": incident.get("lat", 0),
                    "longitude": incident.get("lon", 0),
                    "description": incident.get("desc", ""),
                    "source": provider_name,
                    "confirmation_status": incident.get("status", "reported"),
                    "timestamp": datetime.utcnow().isoformat(),
                    "data_status": "simulated",
                    "quality": "good"
                })
            elif provider_name == "ExternalIncidentProvider":
                props = incident.get("properties", {})
                events = props.get("events", [])
                desc = events[0].get("description", "Unknown") if events else "Unknown"
                
                # Determine severity based on magnitudeOfDelay (0-4 usually)
                magnitude = props.get("magnitudeOfDelay", 0)
                severity = "low"
                if magnitude >= 3:
                    severity = "high"
                elif magnitude == 2:
                    severity = "medium"
                
                coords = incident.get("geometry", {}).get("coordinates", [0, 0])
                lat = coords[1] if len(coords) > 1 else 0
                lon = coords[0] if len(coords) > 0 else 0
                
                normalized.append({
                    "road_segment_id": None,
                    "type": "incident",
                    "severity": severity,
                    "latitude": lat,
                    "longitude": lon,
                    "description": desc,
                    "source": "TomTom",
                    "confirmation_status": "Possible Incident Detected",
                    "timestamp": datetime.utcnow().isoformat(),
                    "data_status": "live" if is_live else "cached",
                    "quality": "good"
                })
                
        return normalized
