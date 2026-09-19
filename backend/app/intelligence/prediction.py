from typing import Dict, Any, List

class RuleBasedPredictionEngine:
    @staticmethod
    def predict(
        current_speed: float, 
        trend: str, 
        congestion_score: float, 
        weather_impact: float, 
        incident_impact: float
    ) -> Dict[str, Any]:
        
        # Base factor based on external events
        # High impact lowers the speed factor
        event_factor = 1.0 - (min(weather_impact + incident_impact, 10.0) / 20.0)
        
        # Trend adjustments
        trend_factor = 1.0
        if trend == "increasing":
            trend_factor = 0.9  # speed will decrease over time
        elif trend == "improving":
            trend_factor = 1.1  # speed will increase
            
        base_future_speed = current_speed * event_factor
        
        factors = []
        if weather_impact > 0:
            factors.append("Weather affecting speeds")
        if incident_impact > 0:
            factors.append("Incidents affecting route")
        if trend == "increasing":
            factors.append("Congestion is currently building")
            
        return {
            "5_min": {
                "predicted_speed": round(base_future_speed * (trend_factor ** 0.5), 1),
                "predicted_congestion": "heavy" if congestion_score > 5 else "moderate",
                "confidence": 0.90,
                "factors": factors
            },
            "10_min": {
                "predicted_speed": round(base_future_speed * trend_factor, 1),
                "predicted_congestion": "heavy" if congestion_score > 4 else "moderate",
                "confidence": 0.85,
                "factors": factors
            },
            "15_min": {
                "predicted_speed": round(base_future_speed * (trend_factor ** 1.5), 1),
                "predicted_congestion": "heavy" if congestion_score > 3 else "moderate",
                "confidence": 0.75,
                "factors": factors
            },
            "model_type": "RuleBasedPredictionEngine"
        }
