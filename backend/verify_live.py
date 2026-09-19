import asyncio
import json
from pydantic import BaseModel
from typing import Dict, Any

from app.intelligence.pipeline import TrafficAIPipeline

class Location(BaseModel):
    latitude: float
    longitude: float

async def run():
    # Use Jalandhar coordinates as requested by user
    origin = Location(latitude=31.326, longitude=75.576)
    destination = Location(latitude=31.395, longitude=75.535)
    
    try:
        print(f"Running pipeline for origin: {origin.latitude}, {origin.longitude}")
        response = await TrafficAIPipeline.analyze_journey(origin, destination)
        print(json.dumps(response, indent=2))
    except Exception as e:
        print(f"Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(run())
