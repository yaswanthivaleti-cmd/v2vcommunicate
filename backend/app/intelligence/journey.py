from typing import Dict, Any

class JourneyImpactEngine:
    @staticmethod
    def calculate(
        route: Dict[str, Any], 
        prediction: Dict[str, Any],
        current_speed: float,
        free_flow_speed: float
    ) -> Dict[str, Any]:
        
        base_eta = route.get("base_eta_minutes", 0)
        
        # If current speed is worse than free flow, it already takes longer
        ratio = current_speed / free_flow_speed if free_flow_speed > 0 else 1.0
        ratio = max(0.1, min(ratio, 1.0))
        
        current_eta = base_eta / ratio
        
        # Predicted ETA based on 15 min prediction
        pred_speed = prediction.get("15_min", {}).get("predicted_speed", current_speed)
        pred_ratio = pred_speed / free_flow_speed if free_flow_speed > 0 else 1.0
        pred_ratio = max(0.1, min(pred_ratio, 1.0))
        
        predicted_eta = base_eta / pred_ratio
        
        return {
            "current_eta": round(current_eta, 1),
            "predicted_eta": round(predicted_eta, 1),
            "expected_delay": round(predicted_eta - base_eta, 1)
        }
