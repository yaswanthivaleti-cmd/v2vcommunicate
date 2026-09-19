import pytest
from app.integrations.normalization.traffic_normalizer import TrafficNormalizer

def test_traffic_normalizer_demo_data():
    raw_data = {
        "id": "seg_123",
        "road": "Main St",
        "speed_kmh": 22.5,
        "free_flow_kmh": 40.0
    }
    
    normalized = TrafficNormalizer.normalize(raw_data, "DemoTrafficProvider", is_live=False)
    
    assert normalized["data_status"] == "simulated"
    assert normalized["current_speed"] == 22.5
    assert normalized["road_segment_id"] == "seg_123"

def test_traffic_normalizer_failed_provider():
    normalized = TrafficNormalizer.normalize(None, "ExternalTrafficProvider", is_live=True)
    
    assert normalized["data_status"] == "unavailable"
    assert normalized["quality"] == "poor"
