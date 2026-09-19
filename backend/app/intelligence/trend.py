from typing import List, Dict, Any

class TrendEngine:
    @staticmethod
    def calculate(recent_speeds: List[float]) -> str:
        """Determines if traffic is increasing, stable, or improving."""
        if not recent_speeds or len(recent_speeds) < 2:
            return "stable"
            
        first = recent_speeds[0]
        last = recent_speeds[-1]
        
        diff = last - first
        if diff > 5.0: # speed is going up
            return "improving"
        elif diff < -5.0: # speed is going down
            return "increasing" # meaning congestion is increasing
            
        return "stable"
