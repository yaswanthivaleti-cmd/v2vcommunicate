from typing import Dict, Any, List

class RecommendationEngine:
    @staticmethod
    def generate(analyzed_routes: List[Dict[str, Any]], primary_route_index: int = 0) -> Dict[str, Any]:
        """Generates a human-readable recommendation action and explanation."""
        if not analyzed_routes:
            return {}
            
        primary = analyzed_routes[primary_route_index]
        recommended = next((r for r in analyzed_routes if r.get("is_recommended")), analyzed_routes[0])
        
        if primary["route"]["route_id"] == recommended["route"]["route_id"]:
            return {
                "action": "stay",
                "route_id": primary["route"]["route_id"],
                "potential_saving_minutes": 0.0,
                "reason": "Primary route is optimal.",
                "factors": ["Lowest predicted ETA", "No major incidents"]
            }
            
        saving = primary["journey_impact"]["predicted_eta"] - recommended["journey_impact"]["predicted_eta"]
        
        if saving > 5.0:
            action = "reroute"
            reason = "Significant time savings on alternative route."
        else:
            action = "consider_alternative"
            reason = "Slightly faster alternative available."
            
        return {
            "action": action,
            "route_id": recommended["route"]["route_id"],
            "potential_saving_minutes": round(saving, 1),
            "reason": reason,
            "factors": [
                f"Saves {round(saving, 1)} minutes",
                "Avoids predicted congestion on primary route"
            ]
        }
