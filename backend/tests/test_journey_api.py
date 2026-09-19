import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_journey_analyze_endpoint():
    response = client.post(
        "/api/v1/journey/analyze",
        json={"origin": "point_a", "destination": "point_b"}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert "current_conditions" in data
    assert "prediction" in data
    assert "journey_impact" in data
    assert "recommendation" in data
    assert "routes" in data
    
    # Default DEMO_MODE=True should give simulated data
    assert data["data_status"] == "simulated"
