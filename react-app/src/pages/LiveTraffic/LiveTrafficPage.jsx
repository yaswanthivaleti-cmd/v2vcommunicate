import React from 'react';
import './LiveTrafficPage.css';
import SegmentCard from '../../components/Cards/SegmentCard/SegmentCard';
import { RefreshCw, Layers, Crosshair, Plus, Minus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const LiveTrafficPage = () => {
  // Mock data for segments
  const segments = [
    { name: "NH-44", badge: "1", severity: "Heavy", currentSpeed: "17", expectedSpeed: "32", congestion: 53, vehicles: 42, time: "2 min ago" },
    { name: "Ring Road ITO", badge: "2", severity: "Severe", currentSpeed: "11", expectedSpeed: "40", congestion: 28, vehicles: 67, time: "1 min ago" },
    { name: "Mathura Road", badge: null, severity: "Moderate", currentSpeed: "26", expectedSpeed: "35", congestion: 74, vehicles: 28, time: "3 min ago" },
    { name: "Outer Ring Road", badge: null, severity: "Low", currentSpeed: "44", expectedSpeed: "50", congestion: 88, vehicles: 18, time: "4 min ago" },
    { name: "Badarpur Flyover", badge: "1", severity: "Severe", currentSpeed: "8", expectedSpeed: "30", congestion: 27, vehicles: 78, time: "1 min ago" },
    { name: "Faridabad Road", badge: null, severity: "Low", currentSpeed: "35", expectedSpeed: "40", congestion: 88, vehicles: 14, time: "5 min ago" },
  ];

  return (
    <div className="live-traffic-page">
      {/* Top Header for Page */}
      <div className="page-header">
        <div className="page-title-section">
          <div className="title-row">
            <h1>Live Traffic</h1>
            <span className="region-badge">NCR Region</span>
          </div>
          <p className="page-subtitle">Real-time monitored road conditions & network congestion telemetry</p>
        </div>
        
        <div className="page-actions">
          <div className="live-demo-badge">
            <span className="live-dot"></span> Live Demo
          </div>
          <div className="updated-time">Updated 03:43:26 PM</div>
          <button className="refresh-btn">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="top-stats-row">
        <div className="stat-col">
          <span className="stat-big-val blue">24</span>
          <div className="stat-label-group">
            <span className="stat-unit">km/h</span>
            <span className="stat-text">AVERAGE SPEED</span>
          </div>
        </div>
        <div className="stat-col">
          <span className="stat-big-val purple">1,290</span>
          <span className="stat-text">ACTIVE<br/>VEHICLES</span>
        </div>
        <div className="stat-col">
          <span className="stat-big-val orange">19</span>
          <span className="stat-text">HEAVY SEGMENTS</span>
        </div>
        <div className="stat-col">
          <span className="stat-big-val red">7</span>
          <span className="stat-text">ACTIVE INCIDENTS</span>
        </div>
      </div>

      {/* Map Section */}
      <div className="traffic-map-container">
        <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '12px' }} zoomControl={false}>
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           {/* Delhi coordinates simulated lines */}
           <Polyline positions={[[28.6, 77.1], [28.65, 77.2], [28.55, 77.25]]} color="#10b981" weight={4} />
           <Polyline positions={[[28.65, 77.2], [28.6, 77.3], [28.5, 77.35]]} color="#f97316" weight={4} />
           <Polyline positions={[[28.55, 77.25], [28.5, 77.3], [28.45, 77.35]]} color="#ef4444" weight={4} />
           
           <Marker position={[28.55, 77.25]}>
              <Popup>Heavy traffic: +18 min delay</Popup>
           </Marker>
           <Marker position={[28.5, 77.3]}>
              <Popup>Moderate: +8 min</Popup>
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

        {/* Traffic Level Legend inside Map */}
        <div className="traffic-level-legend">
          <span className="legend-title">TRAFFIC LEVEL</span>
          <div className="legend-row"><span className="dot low"></span> Low</div>
          <div className="legend-row"><span className="dot mod"></span> Moderate</div>
          <div className="legend-row"><span className="dot hvy"></span> Heavy</div>
          <div className="legend-row"><span className="dot svr"></span> Severe</div>
        </div>
      </div>

      {/* Segments List Header */}
      <div className="segments-header">
        <div className="segments-title-group">
          <h3>TRAFFIC NEARBY</h3>
          <span className="segments-count">12 monitored segments</span>
        </div>
        <div className="sort-control">
          Sort by: <strong>Congestion (High to Low)</strong>
        </div>
      </div>

      {/* Segments Grid */}
      <div className="segments-grid">
        {segments.map((seg, idx) => (
          <SegmentCard key={idx} {...seg} />
        ))}
      </div>
    </div>
  );
};

export default LiveTrafficPage;
