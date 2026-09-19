from app.intelligence.prediction import RuleBasedPredictionEngine

def test_prediction_engine():
    # Test with no weather/incident impact
    result = RuleBasedPredictionEngine.predict(
        current_speed=50.0,
        trend="stable",
        congestion_score=2.0,
        weather_impact=0.0,
        incident_impact=0.0
    )
    
    # Base should remain roughly 50
    assert result["15_min"]["predicted_speed"] == 50.0
    
    # Test with heavy impact
    result_bad = RuleBasedPredictionEngine.predict(
        current_speed=50.0,
        trend="increasing",
        congestion_score=8.0,
        weather_impact=5.0,
        incident_impact=5.0
    )
    
    # Speed should drop significantly
    assert result_bad["15_min"]["predicted_speed"] < 40.0
    assert "Weather affecting speeds" in result_bad["15_min"]["factors"]
    assert "Incidents affecting route" in result_bad["15_min"]["factors"]
