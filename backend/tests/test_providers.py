import pytest
import respx
import httpx
from app.integrations.providers.traffic import ExternalTrafficProvider

@pytest.mark.asyncio
@respx.mock
async def test_external_traffic_provider_success():
    provider = ExternalTrafficProvider("https://api.mocktraffic.com", "fakekey")
    
    # Mock the HTTP response
    respx.get("https://api.mocktraffic.com/segment/test_segment", params={"key": "fakekey"}).respond(
        status_code=200,
        json={"segment_id": "test_segment", "current_speed": 45}
    )
    
    result = await provider.get_segment_traffic("test_segment")
    
    assert result is not None
    assert result["current_speed"] == 45

@pytest.mark.asyncio
@respx.mock
async def test_external_traffic_provider_timeout():
    provider = ExternalTrafficProvider("https://api.mocktraffic.com", "fakekey")
    
    # Mock a timeout
    respx.get("https://api.mocktraffic.com/segment/test_segment", params={"key": "fakekey"}).mock(
        side_effect=httpx.TimeoutException("Mocked timeout")
    )
    
    result = await provider.get_segment_traffic("test_segment")
    
    # BaseProvider catches timeouts and returns None for graceful degradation
    assert result is None

@pytest.mark.asyncio
@respx.mock
async def test_external_traffic_provider_500():
    provider = ExternalTrafficProvider("https://api.mocktraffic.com", "fakekey")
    
    # Mock a 500 error
    respx.get("https://api.mocktraffic.com/segment/test_segment", params={"key": "fakekey"}).respond(
        status_code=500
    )
    
    result = await provider.get_segment_traffic("test_segment")
    
    # BaseProvider catches HTTP errors and returns None
    assert result is None
