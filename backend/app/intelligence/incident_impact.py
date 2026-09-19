from typing import List, Dict, Any

class IncidentImpactEngine:
    @staticmethod
    def calculate(incidents: List[Dict[str, Any]], route_segments: List[str]) -> Dict[str, Any]:
        """Calculates incident impact based on route relevance and severity."""
        relevant_incidents = [
            inc for inc in incidents 
            # In a real app we do spatial matching. 
            # Here we just assume relevance if segments overlap or for demo simplicity.
            if inc.get("road_segment_id") in route_segments or inc.get("road_segment_id") is None
        ]
        
        score = 0.0
        explanations = []
        severity = "low"
        
        for inc in relevant_incidents:
            sev = inc.get("severity", "low").lower()
            if sev == "high" or sev == "severe":
                score += 5.0
                severity = "high"
                explanations.append(f"Major incident: {inc.get('description', 'Unknown')}.")
            elif sev == "medium":
                score += 2.0
                if severity == "low":
                    severity = "medium"
                explanations.append(f"Incident reported: {inc.get('description', 'Unknown')}.")
            else:
                score += 0.5
                explanations.append("Minor incident nearby.")
                
        return {
            "impact_score": score,
            "route_relevance": len(relevant_incidents) > 0,
            "severity": severity,
            "confidence": 0.85 if relevant_incidents else 1.0,
            "explanation": " | ".join(explanations) if explanations else "No incidents affecting route."
        }
