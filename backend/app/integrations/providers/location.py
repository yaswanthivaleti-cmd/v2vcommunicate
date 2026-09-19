from typing import Tuple

class LocationProvider:
    """
    Validates location data from request.
    Does not fetch from external APIs since we use browser geolocation or manual origin.
    """
    def __init__(self):
        self.name = "LocationProvider"
        
    def validate_coordinates(self, lat: float, lon: float) -> bool:
        if not (-90 <= lat <= 90):
            return False
        if not (-180 <= lon <= 180):
            return False
        return True
