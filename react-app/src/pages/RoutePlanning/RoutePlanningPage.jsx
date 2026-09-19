import React, { useState } from 'react';
import './RoutePlanningPage.css';
import Header from '../../components/Header/Header';
import RouteComparisonCard from '../../components/Cards/RouteComparisonCard/RouteComparisonCard';
import RouteDetailRow from '../../components/Cards/RouteDetailRow/RouteDetailRow';
import { MapPin, ArrowRightLeft, Search, Maximize, Layers, Crosshair, Plus, Minus, Route, GitMerge, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from 'react-leaflet';
import { journeyApi } from '../../api/journeyApi';

const RoutePlanningPage = () => {
  const [originCoords] = useState({ latitude: 28.6330, longitude: 77.2194 }); 
  const [destCoords] = useState({ latitude: 28.6200, longitude: 77.3600 }); 
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setAnalyzing(true);
    setError(null);
    try {
      const result = await journeyApi.planJourney(originCoords, destCoords);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      setError("Journey planning failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getRouteColor = (index) => {
    const colors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"];
    return colors[index % colors.length];
  };

  return (
    <div className="route-planning-page">
      <div className="rp-header-container">
        <div className="rp-title-section">
          <div className="rp-icon-title">
            <Route size={16} color="#3b82f6" />
            <span className="rp-pre-title">ROUTE PLANNING</span>
          </div>
          <h1 className="rp-main-title">Find the best route to your destination</h1>
        </div>
      </div>

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
      
      {error && (
        <div className="error-state" style={{marginTop: '20px'}}>
          <AlertTriangle size={32} />
          <h2>{error}</h2>
        </div>
      )}

      {analysisResult && analysisResult.routes && (
        <>
          <div className="rp-map-container" style={{marginTop: '20px'}}>
            <MapContainer center={[originCoords.latitude, originCoords.longitude]} zoom={11} style={{ height: '100%', width: '100%' }} zoomControl={false}>
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
               
               {analysisResult.routes.map((r, i) => {
                  // Real geometry would be decoded here, but we will mock a simple line for visualization since we don't have a decoder imported
                  const isRec = r.route.route_id === analysisResult.recommendation?.recommended_route_id;
                  return (
                    <Polyline 
                      key={i} 
                      positions={[[originCoords.latitude, originCoords.longitude], [originCoords.latitude + 0.01 * (i+1), originCoords.longitude + 0.01 * (i+1)], [destCoords.latitude, destCoords.longitude]]} 
                      color={isRec ? "#10b981" : getRouteColor(i)} 
                      weight={isRec ? 6 : 4} 
                      opacity={isRec ? 1 : 0.6} 
                    />
                  );
               })}
               
               <CircleMarker center={[originCoords.latitude, originCoords.longitude]} radius={6} color="#3b82f6" fillColor="white" fillOpacity={1} weight={3} />
               <CircleMarker center={[destCoords.latitude, destCoords.longitude]} radius={6} color="#ef4444" fillColor="white" fillOpacity={1} weight={3} />
            </MapContainer>
          </div>

          <div className="comparison-section">
            <div className="comparison-header">
              <h2>Route Comparison</h2>
              <p>Compare options to choose the best route</p>
            </div>

            <div className="comparison-cards-row">
              {analysisResult.routes.map((r, i) => {
                const isRec = r.route.route_id === analysisResult.recommendation?.recommended_route_id;
                return (
                  <RouteComparisonCard 
                    key={i}
                    routeName={r.route.route_id || `Route ${i+1}`}
                    badge={isRec ? "RECOMMENDED" : null} 
                    badgeType={isRec ? "recommended" : null} 
                    isSelected={isRec} 
                    eta={`${Math.round(r.route.current_eta_seconds / 60)} min`}
                    distance={`${(r.route.distance_meters / 1000).toFixed(1)} km`}
                    traffic={r.journey_impact?.congestion_score > 5 ? "Heavy" : "Moderate"}
                    delay={`+${r.journey_impact?.potential_delay_minutes || 0} min`}
                    toll="None" 
                  />
                );
              })}
            </div>
          </div>

          <div className="route-details-section">
            <span className="route-details-title">ROUTE DETAILS</span>
            <div className="route-details-list-container">
              {analysisResult.routes.map((r, i) => {
                const isRec = r.route.route_id === analysisResult.recommendation?.recommended_route_id;
                return (
                  <RouteDetailRow 
                    key={i}
                    icon={GitMerge}
                    badge={isRec ? "RECOMMENDED" : null}
                    badgeType={isRec ? "recommended" : null}
                    routeName={r.route.route_id || `Route ${i+1}`}
                    time={`${Math.round(r.route.current_eta_seconds / 60)} min`}
                    distance={`${(r.route.distance_meters / 1000).toFixed(1)} km`}
                    traffic={r.journey_impact?.congestion_score > 5 ? "Heavy" : "Moderate"}
                    delay={`+${r.journey_impact?.potential_delay_minutes || 0} min`}
                    via="Determined by provider"
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoutePlanningPage;
