from typing import Dict, Any

class WeatherImpactEngine:
    @staticmethod
    def calculate(weather_data: Dict[str, Any]) -> Dict[str, Any]:
        """Calculates weather impact score, level, and explanation."""
        condition = weather_data.get("condition", "clear").lower()
        precip = weather_data.get("precipitation", 0.0)
        vis = weather_data.get("visibility", 10.0)
        
        score = 0.0
        explanation = []
        
        if "rain" in condition:
            if precip > 5.0:
                score += 3.0
                explanation.append("Heavy rain reducing road capacity.")
            else:
                score += 1.5
                explanation.append("Light rain affecting surface conditions.")
                
        if vis < 2.0:
            score += 2.0
            explanation.append("Low visibility requires slower speeds.")
            
        if score >= 3.0:
            level = "high"
        elif score > 0.0:
            level = "medium"
        else:
            level = "low"
            explanation.append("Weather is clear, no significant impact.")
            
        return {
            "score": score,
            "level": level,
            "explanation": " | ".join(explanation)
        }
