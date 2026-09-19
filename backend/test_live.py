import asyncio
import httpx

async def test_live_journey():
    url = "http://localhost:8000/api/v1/journey/analyze"
    payload = {
        "origin": "28.6139,77.2090",
        "destination": "28.5355,77.3910"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            print(f"Sending request to {url} with {payload}...")
            response = await client.post(url, json=payload, timeout=15.0)
            print(f"Status Code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print("--- Live Analysis Response ---")
                print(f"Data Status: {data.get('data_status')}")
                
                curr = data.get("current_conditions", {})
                print(f"Current Speed: {curr.get('speed')} km/h")
                print(f"Congestion Score: {curr.get('congestion_score')}")
                
                weather = data.get("weather", {})
                print(f"Weather: {weather.get('condition')} at {weather.get('temperature')}°C (Source: {weather.get('source')})")
                
                incidents = data.get("incidents", [])
                print(f"Incidents Detected: {len(incidents)}")
                if incidents:
                    print(f"  Example: {incidents[0].get('severity')} severity - {incidents[0].get('description')}")
                
            else:
                print("Error Response:")
                print(response.text)
        except Exception as e:
            print(f"Failed to connect: {e}")

if __name__ == "__main__":
    asyncio.run(test_live_journey())
