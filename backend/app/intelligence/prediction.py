from typing import Dict, Any, List

class RuleBasedPredictionEngine:
    @staticmethod
    def predict(
        current_speed: float, 
        trend: str, 
        congestion_score: float, 
        weather_impact: float, 
        incident_impact: float,
        has_sufficient_data: bool = True
    ) -> Dict[str, Any]:
        
        if not has_sufficient_data:
            return {
                "status": "Prediction unavailable — insufficient real-time data."
            }

        # Base factor based on external events
        event_factor = 1.0 - (min(weather_impact + incident_impact, 10.0) / 20.0)
        
        # Trend adjustments
        trend_factor = 1.0
        trend_direction = "Stable"
        if trend == "increasing":
            trend_factor = 0.9  # speed will decrease over time
            trend_direction = "Worsening"
        elif trend == "improving":
            trend_factor = 1.1  # speed will increase
            trend_direction = "Improving"
            
        base_future_speed = current_speed * event_factor
        
        factors = []
        if weather_impact > 0:
            factors.append("Weather affecting speeds")
        if incident_impact > 0:
            factors.append("Incidents affecting route")
        if trend == "increasing":
            factors.append("Congestion is currently building")
            
        return {
            "status": "Deterministic rule-based short-term traffic prediction.",
            "future_speed": round(base_future_speed * trend_factor, 1),
            "confidence": 0.85,
            "trend_direction": trend_direction,
            "5_min": {
                "predicted_speed": round(base_future_speed * (trend_factor ** 0.5), 1),
                "predicted_congestion": "Heavy" if congestion_score > 5 else "Moderate",
                "confidence": "Confidence unavailable",
                "factors": factors
            },
            "10_min": {
                "predicted_speed": round(base_future_speed * trend_factor, 1),
                "predicted_congestion": "Heavy" if congestion_score > 4 else "Moderate",
                "confidence": "Confidence unavailable",
                "factors": factors
            },
            "15_min": {
                "predicted_speed": round(base_future_speed * (trend_factor ** 1.5), 1),
                "predicted_congestion": "Heavy" if congestion_score > 3 else "Moderate",
                "confidence": "Confidence unavailable",
                "factors": factors
            }
        }
