from typing import Dict, Any

class CongestionEngine:
    @staticmethod
    def calculate(current_speed: float, free_flow_speed: float) -> Dict[str, Any]:
        """Calculates congestion score and level based on speed ratio."""
        if free_flow_speed <= 0:
            return {"score": 0.0, "level": "unknown"}
            
        ratio = current_speed / free_flow_speed
        score = max(0.0, min(10.0, (1.0 - ratio) * 10.0))
        
        if ratio > 0.8:
            level = "smooth"
        elif ratio > 0.5:
            level = "moderate"
        elif ratio > 0.2:
            level = "heavy"
        else:
            level = "severe"
            
        return {
            "score": round(score, 1),
            "level": level
        }
