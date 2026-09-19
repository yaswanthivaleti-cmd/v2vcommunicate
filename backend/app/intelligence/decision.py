from typing import List, Dict, Any

class RouteDecisionEngine:
    @staticmethod
    def compare(analyzed_routes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Sorts and compares routes based on predicted ETA and incident impact."""
        if not analyzed_routes:
            return []
            
        # Sort by predicted ETA ascending
        analyzed_routes.sort(key=lambda r: r["journey_impact"]["predicted_eta"])
        
        # Tag the best route
        for idx, route in enumerate(analyzed_routes):
            route["is_recommended"] = (idx == 0)
            
        return analyzed_routes
