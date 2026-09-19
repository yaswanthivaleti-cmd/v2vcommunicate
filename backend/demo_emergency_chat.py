import requests
import time
import sys

BASE_URL = "http://127.0.0.1:8000/api/v1"

def print_step(msg):
    print(f"\n[STEP] {msg}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python demo_emergency_chat.py <vehicle_b_uuid_from_browser>")
        print("To get Vehicle B UUID, look in your browser's Local Storage for 'trafficai_vehicle_uuid'")
        return

    vehicle_b_uuid = sys.argv[1]
    vehicle_a_uuid = "vehicle-a-demo-originator-1234"

    # Step 1: Update Presence for Vehicle B (from the browser)
    print_step(f"Setting presence for Vehicle B (Browser UI UUID: {vehicle_b_uuid})")
    requests.post(f"{BASE_URL}/emergency/presence", json={
        "vehicle_uuid": vehicle_b_uuid,
        "latitude": 31.325,
        "longitude": 75.576,
        "heading": 180,
        "speed": 45
    })

    # Step 2: Update Presence for Vehicle A (the originator)
    print_step("Setting presence for Vehicle A (Originator) 400m ahead of B")
    requests.post(f"{BASE_URL}/emergency/presence", json={
        "vehicle_uuid": vehicle_a_uuid,
        "latitude": 31.321,  # slightly south, heading south (180)
        "longitude": 75.576,
        "heading": 180,
        "speed": 60
    })
    
    time.sleep(1)

    # Step 3: Trigger Sudden Stop for Vehicle A
    print_step("Vehicle A triggers SUDDEN STOP event")
    res = requests.post(f"{BASE_URL}/emergency/events", json={
        "vehicle_uuid": vehicle_a_uuid,
        "type": "sudden_stop",
        "latitude": 31.321,
        "longitude": 75.576,
        "heading": 180,
        "speed_before": 60,
        "speed_after": 0,
        "severity": "high",
        "timestamp": "2026-09-19T10:00:00Z"
    })
    
    data = res.json()
    print("Response:", data)
    print("\n✅ Event triggered! Vehicle B (your browser) should now receive an alert toast.")
    print("Go to your browser window and click 'Open Chat'!")

if __name__ == "__main__":
    main()
