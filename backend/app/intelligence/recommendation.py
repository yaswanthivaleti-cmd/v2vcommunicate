from typing import Dict, Any, List

class RecommendationEngine:
    @staticmethod
    def generate(analyzed_routes: List[Dict[str, Any]], user_preference: str = "FASTEST") -> Dict[str, Any]:
        """Evaluates route alternatives against the User's stored preference."""
        if not analyzed_routes:
            return {}
            
        def score_route(route: Dict[str, Any]) -> float:
            if user_preference == "FASTEST":
                # Lower predicted ETA is better
                predicted_eta = route.get("journey_impact", {}).get("predicted_eta")
                if predicted_eta is None:
                    return route["route"]["current_eta_seconds"] / 60.0
                return predicted_eta
                
            elif user_preference == "SHORTEST":
                return route["route"]["distance_meters"] / 1000.0
                
            elif user_preference == "AVOID_CONGESTION":
                return route.get("journey_impact", {}).get("congestion_score", 0.0)
                
            elif user_preference == "RELIABLE_ARRIVAL":
                # Penalty for routes with incidents or high variability
                base_time = route["route"]["current_eta_seconds"] / 60.0
                return base_time + (10 if route.get("incidents") else 0)
                
            return route["route"]["current_eta_seconds"] / 60.0

        # Sort routes by lowest score based on user preference
        sorted_routes = sorted(analyzed_routes, key=score_route)
        recommended = sorted_routes[0]
        
        return {
            "recommended_route_id": recommended["route"]["route_id"],
            "reason": f"Recommended based on {user_preference} priority.",
            "factors": [f"Optimized for {user_preference.lower()}."]
        }
