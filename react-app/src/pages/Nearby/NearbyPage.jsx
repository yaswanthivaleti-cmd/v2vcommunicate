import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NearbyPage.css';
import AlertActionModal from '../../components/Modals/AlertActionModal/AlertActionModal';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const vehicleIcon = L.divIcon({
  html: '<div style="font-size: 24px; text-align: center; line-height: 24px;">🚗</div>',
  className: 'emoji-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const myLocationIcon = L.divIcon({
  html: '<div style="font-size: 24px; text-align: center; line-height: 24px;">🚙</div>',
  className: 'emoji-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const MapUpdater = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
};

const NearbyPage = ({ vehicleUuid }) => {
  const [myLocation, setMyLocation] = useState({ lat: 28.6139, lon: 77.2090 }); // Default Delhi
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, targetUuid: null, isBroadcast: false });
  const mapRef = useRef(null);

  // Periodic location fetch
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMyLocation({ lat: latitude, lon: longitude });
            postPresenceAndFetchNearby(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location, using default", error);
            // Fallback
            postPresenceAndFetchNearby(myLocation.lat, myLocation.lon);
          }
        );
      } else {
        postPresenceAndFetchNearby(myLocation.lat, myLocation.lon);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 60000); // every minute

    return () => clearInterval(interval);
  }, []);

  const postPresenceAndFetchNearby = async (lat, lon) => {
    if (!vehicleUuid) return;
    try {
      // 1. Post Presence
      await fetch('/api/v1/emergency/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_uuid: vehicleUuid,
          latitude: lat,
          longitude: lon,
          heading: 0,
          speed: 0
        })
      });

      // 2. Fetch Nearby
      const response = await fetch(`/api/v1/emergency/nearby/${vehicleUuid}?lat=${lat}&lon=${lon}&radius=500`);
      if (response.ok) {
        const data = await response.json();
        setNearbyVehicles(data);
      }
    } catch (err) {
      console.error("Failed to fetch nearby vehicles", err);
    }
  };

  const handleOpenModal = (targetUuid, isBroadcast = false) => {
    setModalState({ isOpen: true, targetUuid, isBroadcast });
  };

  const handleSendAlert = async (type, customText) => {
    try {
      const payload = {
        vehicle_uuid: vehicleUuid,
        type: type,
        latitude: myLocation.lat,
        longitude: myLocation.lon,
        heading: 0,
        speed_before: 0,
        speed_after: 0,
        severity: "high",
        timestamp: new Date().toISOString(),
      };

      if (modalState.isBroadcast) {
        payload.broadcast = true;
      } else {
        payload.target_uuid = modalState.targetUuid;
      }

      if (customText) {
        payload.custom_text = customText;
      }

      await fetch('/api/v1/emergency/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

    } catch (err) {
      console.error("Error sending alert", err);
    }
  };

  return (
    <div className="nearby-page">
      <div className="nearby-header">
        <h1>Nearby Vehicles</h1>
        <p>Showing active vehicles within a 500m radius.</p>
        <button className="broadcast-btn" onClick={() => handleOpenModal(null, true)}>
          📡 Broadcast Emergency
        </button>
      </div>

      <div className="nearby-content">
        <div className="nearby-list">
          <h3>{nearbyVehicles.length} Vehicles Nearby</h3>
          {nearbyVehicles.map(v => (
            <div key={v.vehicle_uuid} className="vehicle-list-item" onClick={() => handleOpenModal(v.vehicle_uuid, false)}>
              <div className="vehicle-info">
                <span className="vehicle-id">ID: {v.vehicle_uuid.substring(0, 8)}...</span>
                <span className="vehicle-dist">{v.distance_meters}m away</span>
              </div>
              <button className="ping-btn">Ping</button>
            </div>
          ))}
          {nearbyVehicles.length === 0 && (
            <p className="no-vehicles">No vehicles found within 500m.</p>
          )}
        </div>

        <div className="nearby-map-container">
          <MapContainer 
            center={[myLocation.lat, myLocation.lon]} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <MapUpdater lat={myLocation.lat} lon={myLocation.lon} />
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* 500m Radius Circle */}
            <Circle 
              center={[myLocation.lat, myLocation.lon]} 
              radius={500} 
              pathOptions={{ fillColor: '#3b82f6', color: '#2563eb', weight: 1, fillOpacity: 0.1 }}
            />

            {/* My Location */}
            <Marker position={[myLocation.lat, myLocation.lon]} icon={myLocationIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Nearby Vehicles */}
            {nearbyVehicles.map(v => (
              <Marker 
                key={v.vehicle_uuid} 
                position={[v.latitude, v.longitude]} 
                icon={vehicleIcon}
                eventHandlers={{
                  click: () => handleOpenModal(v.vehicle_uuid, false),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <p>Vehicle: {v.vehicle_uuid.substring(0, 8)}...</p>
                    <p>Distance: {v.distance_meters}m</p>
                    <button onClick={() => handleOpenModal(v.vehicle_uuid, false)}>Send Alert</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <AlertActionModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, targetUuid: null, isBroadcast: false })}
        onSend={handleSendAlert}
        targetName={modalState.targetUuid ? modalState.targetUuid.substring(0, 8) + '...' : ''}
        isBroadcast={modalState.isBroadcast}
      />
    </div>
  );
};

export default NearbyPage;
