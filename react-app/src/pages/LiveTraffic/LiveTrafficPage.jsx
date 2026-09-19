import React, { useState, useEffect } from 'react';
import './LiveTrafficPage.css';
import SegmentCard from '../../components/Cards/SegmentCard/SegmentCard';
import { RefreshCw, Layers, Crosshair, Plus, Minus, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { journeyApi } from '../../api/journeyApi';

// Helper component to auto-zoom map to fit all polylines
const FitBounds = ({ segments }) => {
  const map = useMap();
  useEffect(() => {
    if (segments && segments.length > 0) {
      const bounds = [];
      segments.forEach(seg => {
        if (seg.coordinates) {
          seg.coordinates.forEach(coord => bounds.push(coord));
        }
      });
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [segments, map]);
  return null;
};

const LiveTrafficPage = () => {
  const [trafficSegments, setTrafficSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultPoints = [
    { name: "Connaught Place", lat: 28.6304, lng: 77.2177 },
    { name: "ITO Junction", lat: 28.6293, lng: 77.2433 },
    { name: "AIIMS Intersection", lat: 28.5672, lng: 77.2100 }
  ];

  const fetchTrafficForPoints = async (pointsToFetch) => {
    setLoading(true);
    setError(null);
    try {
      const promises = pointsToFetch.map(point => 
        journeyApi.getTraffic(point.lat, point.lng).then(data => ({ ...data, pointName: point.name }))
      );
      const results = await Promise.all(promises);
      setTrafficSegments(results);
    } catch (err) {
      setError('Traffic Data Unavailable');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoadName = async (lat, lng, fallbackName) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`, {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const road = data.address?.road || data.address?.suburb || data.address?.neighbourhood || data.address?.village || data.address?.city || data.display_name?.split(',')[0];
        return road || fallbackName;
      }
    } catch (err) {
      console.warn("Reverse geocoding failed", err);
    }
    return fallbackName;
  };

  const initTrafficData = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const dynamicPoints = [
            { name: "Your Location", lat: latitude, lng: longitude },
            { name: "North Route", lat: latitude + 0.015, lng: longitude + 0.002 },
            { name: "East Route", lat: latitude - 0.002, lng: longitude + 0.015 }
          ];

          const pointsWithNames = await Promise.all(dynamicPoints.map(async (p) => {
             const roadName = await fetchRoadName(p.lat, p.lng, p.name);
             return { ...p, name: roadName };
          }));

          fetchTrafficForPoints(pointsWithNames);
        },
        (err) => {
          console.warn("Location not provided. Using default.", err);
          fetchTrafficForPoints(defaultPoints);
        }
      );
    } else {
      fetchTrafficForPoints(defaultPoints);
    }
  };

  useEffect(() => {
    initTrafficData();
  }, []);

  // Calculate aggregated stats
  const avgCurrentSpeed = trafficSegments.length 
    ? Math.round(trafficSegments.reduce((acc, curr) => acc + (curr.current_speed || 0), 0) / trafficSegments.length)
    : "--";
  const avgFreeSpeed = trafficSegments.length 
    ? Math.round(trafficSegments.reduce((acc, curr) => acc + (curr.free_flow_speed || 0), 0) / trafficSegments.length)
    : "--";

  return (
    <div className="live-traffic-page">
      {/* Top Header for Page */}
      <div className="page-header">
        <div className="page-title-section">
          <div className="title-row">
            <h1>Live Traffic</h1>
            <span className="region-badge">Current Region: Live</span>
          </div>
          <p className="page-subtitle">Real-time monitored road conditions & network congestion telemetry</p>
        </div>
        
        <div className="page-actions">
          <div className="updated-time">Updated Now</div>
          <button className="refresh-btn" onClick={initTrafficData}>
            <RefreshCw size={16} className={loading ? "spin" : ""} />
          </button>
        </div>
      </div>

      {loading && <div className="loading-state">Loading live traffic network...</div>}
      
      {error && !loading && (
        <div className="error-state">
          <AlertTriangle size={32} />
          <h2>{error}</h2>
          <p>We could not fetch real-time traffic data from our providers. Please try again later.</p>
        </div>
      )}

      {!loading && !error && trafficSegments.length > 0 && (
        <>
          {/* Top Stats */}
          <div className="top-stats-row">
            <div className="stat-col">
              <span className="stat-big-val blue">{avgCurrentSpeed}</span>
              <div className="stat-label-group">
                <span className="stat-unit">km/h</span>
                <span className="stat-text">AVG CURRENT SPEED</span>
              </div>
            </div>
            <div className="stat-col">
              <span className="stat-big-val purple">{avgFreeSpeed}</span>
              <div className="stat-label-group">
                <span className="stat-unit">km/h</span>
                <span className="stat-text">AVG FREE FLOW SPEED</span>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="traffic-map-container">
             <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '12px' }} zoomControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitBounds segments={trafficSegments} />
                
                {trafficSegments.map((segment, idx) => (
                  <React.Fragment key={idx}>
                    {segment.coordinates && segment.coordinates.length > 0 && (
                      <Polyline 
                        positions={segment.coordinates}
                        color={segment.current_speed < (segment.free_flow_speed * 0.5) ? "#ef4444" : (segment.current_speed < (segment.free_flow_speed * 0.8) ? "#f59e0b" : "#22c55e")}
                        weight={8}
                        opacity={0.8}
                      />
                    )}
                    {segment.coordinates && segment.coordinates.length > 0 && (
                      <Marker position={segment.coordinates[0]}>
                         <Popup>{segment.pointName}: {segment.current_speed} km/h</Popup>
                      </Marker>
                    )}
                  </React.Fragment>
                ))}
             </MapContainer>
            
            {/* Floating Map Controls */}
            <div className="map-controls-group">
              <button className="map-control-btn"><Layers size={18} /></button>
              <button className="map-control-btn"><Crosshair size={18} /></button>
              <div className="zoom-controls">
                <button className="map-control-btn"><Plus size={18} /></button>
                <div className="divider"></div>
                <button className="map-control-btn"><Minus size={18} /></button>
              </div>
            </div>
          </div>

          <div className="segments-header">
            <div className="segments-title-group">
              <h3>MONITORED SEGMENTS</h3>
            </div>
          </div>

          <div className="segments-grid">
            {trafficSegments.map((segment, idx) => (
              <SegmentCard 
                key={idx}
                name={segment.pointName} 
                badge={segment.source}
                severity={segment.current_speed < (segment.free_flow_speed * 0.5) ? "Severe" : (segment.current_speed < (segment.free_flow_speed * 0.8) ? "Moderate" : "Clear")}
                currentSpeed={segment.current_speed}
                expectedSpeed={segment.free_flow_speed}
                congestion={Math.max(0, Math.round((1 - (segment.current_speed / Math.max(segment.free_flow_speed, 1))) * 100))}
                time="Just now"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveTrafficPage;
