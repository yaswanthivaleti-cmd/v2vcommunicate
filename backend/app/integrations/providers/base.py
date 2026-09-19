import httpx
from typing import Optional, Dict, Any
from app.core.logging import logger

class BaseProvider:
    def __init__(self, name: str, timeout: float = 5.0):
        self.name = name
        self.timeout = timeout

    async def fetch_async(self, url: str, params: dict = None, headers: dict = None) -> Optional[Dict[str, Any]]:
        """Makes an asynchronous HTTP request with timeout and error handling."""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params, headers=headers)
                response.raise_for_status()
                return response.json()
        except httpx.TimeoutException:
            logger.error(f"[{self.name}] Request timed out.")
            return None
        except httpx.HTTPStatusError as e:
            logger.error(f"[{self.name}] HTTP error {e.response.status_code}: {e.response.text}")
            return None
        except httpx.RequestError as e:
            logger.error(f"[{self.name}] Network error: {e}")
            return None
        except Exception as e:
            logger.error(f"[{self.name}] Unexpected error: {e}")
            return None
