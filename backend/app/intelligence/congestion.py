from typing import Dict, Any

class CongestionEngine:
    @staticmethod
    def calculate(current_speed: float, free_flow_speed: float) -> Dict[str, Any]:
        """Calculates congestion score and level based on speed ratio."""
        if free_flow_speed <= 0:
            return {"score": 0.0, "ratio": 0.0, "level": "unknown"}
            
        ratio = current_speed / free_flow_speed
        score = max(0.0, min(10.0, (1.0 - ratio) * 10.0))
        
        # Thresholds defined as prototype parameters
        if ratio >= 0.80:
            level = "Low"
        elif ratio >= 0.60:
            level = "Moderate"
        elif ratio >= 0.40:
            level = "Heavy"
        else:
            level = "Severe"
            
        return {
            "score": round(score, 1),
            "ratio": round(ratio, 2),
            "level": level
        }
