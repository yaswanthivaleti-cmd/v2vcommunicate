import math
from typing import List, Dict
from app.models.emergency_repository import emergency_db

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371000  # radius of Earth in meters
    phi_1 = math.radians(lat1)
    phi_2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2.0) ** 2 + \
        math.cos(phi_1) * math.cos(phi_2) * \
        math.sin(delta_lambda / 2.0) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def calculate_bearing(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Calculates bearing from point 1 to point 2
    phi_1 = math.radians(lat1)
    phi_2 = math.radians(lat2)
    lambda_1 = math.radians(lon1)
    lambda_2 = math.radians(lon2)
    
    y = math.sin(lambda_2 - lambda_1) * math.cos(phi_2)
    x = math.cos(phi_1) * math.sin(phi_2) - \
        math.sin(phi_1) * math.cos(phi_2) * math.cos(lambda_2 - lambda_1)
        
    theta = math.atan2(y, x)
    return (math.degrees(theta) + 360) % 360

def heading_difference(h1: float, h2: float) -> float:
    diff = abs(h1 - h2)
    return min(diff, 360 - diff)

class NearbyVehicleService:
    def __init__(self):
        self.max_distance_m = 1000.0
        self.max_heading_diff = 45.0
        
    def find_relevant_vehicles(self, event_lat: float, event_lon: float, event_heading: float, originator_uuid: str) -> List[Dict]:
        relevant_vehicles = []
        all_presence = emergency_db.get_all_presence()
        
        for p in all_presence:
            v_uuid = p["vehicle_uuid"]
            if v_uuid == originator_uuid:
                continue
                
            v_lat = p["latitude"]
            v_lon = p["longitude"]
            v_heading = p["heading"]
            
            # 1. Distance check
            dist = haversine_distance(event_lat, event_lon, v_lat, v_lon)
            if dist > self.max_distance_m:
                continue
                
            # 2. Heading compatibility
            # Both vehicles should be traveling in roughly the same direction
            if heading_difference(event_heading, v_heading) > self.max_heading_diff:
                continue
                
            # 3. Approaching check (Is vehicle B behind vehicle A?)
            # Bearing from B to A should match B's heading
            bearing_b_to_a = calculate_bearing(v_lat, v_lon, event_lat, event_lon)
            if heading_difference(v_heading, bearing_b_to_a) > 90.0:
                # If the bearing to the event is > 90 degrees different from vehicle's heading, 
                # the vehicle has likely already passed it or is moving away.
                continue
                
            # If we pass these checks, it's relevant
            p_copy = dict(p)
            p_copy["distance_meters"] = round(dist)
            relevant_vehicles.append(p_copy)
            
        return relevant_vehicles

nearby_vehicle_service = NearbyVehicleService()
