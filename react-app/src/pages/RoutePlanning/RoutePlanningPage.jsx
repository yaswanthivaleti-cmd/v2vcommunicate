import React, { useState } from 'react';
import './RoutePlanningPage.css';
import Header from '../../components/Header/Header';
import SearchCard from '../../components/Cards/SearchCard/SearchCard';
import RouteComparisonCard from '../../components/Cards/RouteComparisonCard/RouteComparisonCard';
import RouteDetailRow from '../../components/Cards/RouteDetailRow/RouteDetailRow';
import { MapPin, ArrowRightLeft, Search, Maximize, Layers, Crosshair, Plus, Minus, Route, GitMerge, Zap, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from 'react-leaflet';
import { journeyApi } from '../../api/journeyApi';

const RoutePlanningPage = () => {
  // We use hardcoded coordinates for the demo corresponding to the input labels
  const [originCoords] = useState({ latitude: 28.6330, longitude: 77.2194 }); // Connaught Place
  const [destCoords] = useState({ latitude: 28.6200, longitude: 77.3600 }); // Sector 62, Noida
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSearch = async () => {
    setAnalyzing(true);
    try {
      const result = await journeyApi.analyzeJourney(originCoords, destCoords);
      console.log("Backend Response:", result);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="route-planning-page">
      {/* Page Header */}
      <div className="rp-header-container">
        <div className="rp-title-section">
          <div className="rp-icon-title">
            <Route size={16} color="#3b82f6" />
            <span className="rp-pre-title">ROUTE PLANNING</span>
          </div>
          <h1 className="rp-main-title">Find the best route to your destination</h1>
          <p className="rp-subtitle">Get real-time traffic, compare multiple routes and choose the fastest way.</p>
        </div>
        
        <div className="rp-header-actions">
          <span className="rp-date">FRIDAY, SEP 18</span>
          <div className="live-demo-badge">
            <span className="live-dot"></span> Live Traffic
          </div>
          <span className="rp-updated">Updated just now</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-route-box">
        <span className="search-label">WHERE ARE YOU GOING?</span>
        <div className="search-inputs-row">
          <div className="input-wrapper">
            <span className="input-dot blue"></span>
            <input type="text" value="Connaught Place, New Delhi" readOnly />
          </div>
          <button className="swap-btn"><ArrowRightLeft size={16} /></button>
          <div className="input-wrapper">
            <MapPin size={16} color="#ef4444" className="input-icon-red" />
            <input type="text" value="Sector 62, Noida" readOnly />
          </div>
          <button className="find-routes-btn" onClick={handleSearch} disabled={analyzing}>
            <Search size={16} /> {analyzing ? 'Analyzing...' : 'Find Routes'}
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="rp-map-container">
        <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100%', width: '100%' }} zoomControl={false}>
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           {/* Simulate routes */}
           <Polyline positions={[[28.63, 77.22], [28.58, 77.26], [28.62, 77.36]]} color="#3b82f6" weight={5} opacity={0.8} />
           <Polyline positions={[[28.63, 77.22], [28.59, 77.30], [28.62, 77.36]]} color="#10b981" weight={5} opacity={0.8} />
           <Polyline positions={[[28.58, 77.26], [28.59, 77.30]]} color="#ef4444" weight={5} opacity={0.8} />
           
           <CircleMarker center={[28.63, 77.22]} radius={6} color="#3b82f6" fillColor="white" fillOpacity={1} weight={3} />
           <CircleMarker center={[28.62, 77.36]} radius={6} color="#ef4444" fillColor="white" fillOpacity={1} weight={3} />

           <Marker position={[28.58, 77.26]}>
              <Popup>Moderate: +8 min</Popup>
           </Marker>
           <Marker position={[28.59, 77.30]}>
              <Popup>Heavy traffic: +18 min</Popup>
           </Marker>
        </MapContainer>

        {/* Map Overlays */}
        <div className="rp-map-legend">
          <div className="legend-item"><span className="dot smooth"></span> Smooth</div>
          <div className="legend-item"><span className="dot moderate"></span> Moderate</div>
          <div className="legend-item"><span className="dot heavy"></span> Heavy</div>
          <div className="legend-item"><span className="dot severe"></span> Severe</div>
        </div>

        <button className="fullscreen-btn">
          <Maximize size={14} /> View Fullscreen
        </button>

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

      {/* Comparison Section */}
      <div className="comparison-section">
        <div className="comparison-header">
          <h2>Route Comparison</h2>
          <p>Compare options to choose the best route</p>
        </div>

        {analysisResult && (
          <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px', marginBottom: '24px', border: '1px solid #10b981' }}>
            <h3 style={{ color: '#065f46', marginBottom: '8px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} /> Live Backend Response Received!
            </h3>
            <pre style={{ margin: 0, fontSize: '12px', color: '#047857', overflowX: 'auto' }}>
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="comparison-cards-row">
          <RouteComparisonCard 
            routeName="Route A" 
            badge="RECOMMENDED" 
            badgeType="recommended" 
            isSelected={true} 
            eta={analysisResult?.prediction?.predicted_eta ? `${analysisResult.prediction.predicted_eta} min` : "28 min"}
            distance="12.4 km" 
            traffic={analysisResult?.current_conditions?.traffic_level || "Moderate"} 
            delay={analysisResult?.journey_impact?.potential_delay ? `+${analysisResult.journey_impact.potential_delay} min` : "+4 min"}
            toll="None" 
          />
          <RouteComparisonCard 
            routeName="Route B" 
            badge="FASTEST" 
            badgeType="fastest" 
            isSelected={false} 
            eta="25 min" 
            distance="14.1 km" 
            traffic="Heavy" 
            delay="+8 min" 
            toll="₹45" 
          />
          <RouteComparisonCard 
            routeName="Route C" 
            badge="ALTERNATIVE" 
            badgeType="alternative" 
            isSelected={false} 
            eta="31 min" 
            distance="13.2 km" 
            traffic="Low" 
            delay="+2 min" 
            toll="None" 
          />
        </div>
      </div>

      {/* Route Details Section */}
      <div className="route-details-section">
        <span className="route-details-title">ROUTE DETAILS</span>
        
        <div className="route-details-list-container">
          <RouteDetailRow 
            icon={GitMerge}
            badge="RECOMMENDED"
            badgeType="recommended"
            routeName="Route A"
            time="28 min"
            distance="12.4 km"
            traffic="Moderate"
            delay="+4 min"
            via="Ring Road → Ashram Chowk → Mathura Road"
          />
          <RouteDetailRow 
            icon={Zap}
            badge="FASTEST"
            badgeType="fastest"
            routeName="Route B"
            time="25 min"
            distance="14.1 km"
            traffic="Heavy"
            delay="+8 min"
            toll="₹45"
            via="DND Flyway → Noida Link Road"
          />
          <RouteDetailRow 
            icon={MapIcon}
            badge="ALTERNATIVE"
            badgeType="alternative"
            routeName="Route C"
            time="31 min"
            distance="13.2 km"
            traffic="Low"
            delay="+2 min"
            via="MB Road → Tughlaqabad → Faridabad Road"
          />
        </div>
      </div>
    </div>
  );
};

export default RoutePlanningPage;
