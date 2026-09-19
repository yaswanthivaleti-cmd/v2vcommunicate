import React, { useState, useEffect } from 'react';
import './LiveTrafficPage.css';
import SegmentCard from '../../components/Cards/SegmentCard/SegmentCard';
import { RefreshCw, Layers, Crosshair, Plus, Minus, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { journeyApi } from '../../api/journeyApi';

const LiveTrafficPage = () => {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default coordinate (e.g. Delhi)
  const defaultLat = 28.6139;
  const defaultLng = 77.2090;

  const fetchTraffic = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you'd get the user's geolocation here
      const data = await journeyApi.getTraffic(defaultLat, defaultLng);
      setTrafficData(data);
    } catch (err) {
      setError('Traffic Data Unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraffic();
  }, []);

  return (
    <div className="live-traffic-page">
      {/* Top Header for Page */}
      <div className="page-header">
        <div className="page-title-section">
          <div className="title-row">
            <h1>Live Traffic</h1>
            <span className="region-badge">Current Region</span>
          </div>
          <p className="page-subtitle">Real-time monitored road conditions & network congestion telemetry</p>
        </div>
        
        <div className="page-actions">
          <div className="updated-time">Updated Now</div>
          <button className="refresh-btn" onClick={fetchTraffic}>
            <RefreshCw size={16} className={loading ? "spin" : ""} />
          </button>
        </div>
      </div>

      {loading && <div className="loading-state">Loading traffic data...</div>}
      
      {error && !loading && (
        <div className="error-state">
          <AlertTriangle size={32} />
          <h2>{error}</h2>
          <p>We could not fetch real-time traffic data from our providers. Please try again later.</p>
        </div>
      )}

      {!loading && !error && trafficData && (
        <>
          {/* Top Stats */}
          <div className="top-stats-row">
            <div className="stat-col">
              <span className="stat-big-val blue">{trafficData.current_speed || "--"}</span>
              <div className="stat-label-group">
                <span className="stat-unit">km/h</span>
                <span className="stat-text">CURRENT SPEED</span>
              </div>
            </div>
            <div className="stat-col">
              <span className="stat-big-val purple">{trafficData.free_flow_speed || "--"}</span>
              <div className="stat-label-group">
                <span className="stat-unit">km/h</span>
                <span className="stat-text">FREE FLOW SPEED</span>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="traffic-map-container">
            <MapContainer center={[defaultLat, defaultLng]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '12px' }} zoomControl={false}>
               <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={[defaultLat, defaultLng]}>
                  <Popup>Current Speed: {trafficData.current_speed} km/h</Popup>
               </Marker>
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
              <h3>TRAFFIC DATA</h3>
            </div>
          </div>

          <div className="segments-grid">
            <SegmentCard 
              name="Current Location" 
              badge={null}
              severity={trafficData.current_speed < (trafficData.free_flow_speed * 0.5) ? "Severe" : "Moderate"}
              currentSpeed={trafficData.current_speed}
              expectedSpeed={trafficData.free_flow_speed}
              congestion={Math.round((trafficData.current_speed / trafficData.free_flow_speed) * 100)}
              time="Just now"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LiveTrafficPage;
