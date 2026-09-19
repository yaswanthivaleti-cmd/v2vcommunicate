import React, { useState } from 'react';
import './RoutePlanningPage.css';
import Header from '../../components/Header/Header';
import RouteComparisonCard from '../../components/Cards/RouteComparisonCard/RouteComparisonCard';
import RouteDetailRow from '../../components/Cards/RouteDetailRow/RouteDetailRow';
import { MapPin, ArrowRightLeft, Search, Maximize, Layers, Crosshair, Plus, Minus, Route, GitMerge, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from 'react-leaflet';
import { journeyApi } from '../../api/journeyApi';

const RoutePlanningPage = () => {
  const [originCoords, setOriginCoords] = useState({ latitude: 28.6330, longitude: 77.2194 }); 
  const [destCoords, setDestCoords] = useState(null); // will be determined by geocoding
  
  const [originName, setOriginName] = useState("Locating...");
  const [destName, setDestName] = useState(""); // Empty by default

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const fetchRoadName = async (lat, lng, fallbackName) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
      });
      if (res.ok) {
        const data = await res.json();
        // Prioritize specific building/road over general village
        const road = data.address?.amenity || data.address?.road || data.address?.suburb || data.address?.neighbourhood || data.address?.city || data.address?.village || data.display_name?.split(',')[0];
        return road || fallbackName;
      }
    } catch (err) {
      console.warn("Reverse geocoding failed", err);
    }
    return fallbackName;
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setOriginCoords({ latitude: lat, longitude: lon });
          
          // Set destination ~5-10km away
          const destLat = lat - 0.05;
          const destLon = lon + 0.05;
          setDestCoords({ latitude: destLat, longitude: destLon });

          setOriginName("Current Location");
        },
        (err) => {
          setOriginName("Connaught Place, New Delhi");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setOriginName("Connaught Place, New Delhi");
    }
  }, []);

  const geocodeDestination = async (query) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon)
          };
        }
      }
    } catch (err) {
      console.warn("Forward geocoding failed", err);
    }
    return null;
  };

  const handleSearch = async () => {
    if (!originName.trim()) {
      setError("Please enter an origin.");
      return;
    }
    if (!destName.trim()) {
      setError("Please enter a destination.");
      return;
    }
    
    setAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let finalOriginCoords = originCoords;
      let finalDestCoords = destCoords;
      
      // If they typed a custom origin, geocode it
      if (originName !== "Current Location" && originName !== "Locating...") {
        const oCoords = await geocodeDestination(originName);
        if (oCoords) {
          finalOriginCoords = oCoords;
          setOriginCoords(oCoords);
        } else {
          setError("Could not find the origin location. Please try another name.");
          setAnalyzing(false);
          return;
        }
      }

      // Geocode destination
      const coords = await geocodeDestination(destName);
      if (coords) {
        finalDestCoords = coords;
        setDestCoords(coords);
      } else {
        setError("Could not find that destination. Please try another name.");
        setAnalyzing(false);
        return;
      }

      const result = await journeyApi.planJourney(finalOriginCoords, finalDestCoords);
      setAnalysisResult(result);
      if (result && result.recommendation?.recommended_route_id) {
        setSelectedRouteId(result.recommendation.recommended_route_id);
      } else if (result && result.routes && result.routes.length > 0) {
        setSelectedRouteId(result.routes[0].route.route_id);
      }
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
            <input 
              type="text" 
              value={originName} 
              onChange={(e) => setOriginName(e.target.value)}
              placeholder="Enter origin..."
            />
          </div>
          <button className="swap-btn"><ArrowRightLeft size={16} /></button>
          <div className="input-wrapper">
            <MapPin size={16} color="#ef4444" className="input-icon-red" />
            <input 
              type="text" 
              placeholder="Enter destination..."
              value={destName} 
              onChange={(e) => setDestName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
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
                  const isSelected = r.route.route_id === selectedRouteId;
                  
                  let positions = [];
                  if (Array.isArray(r.route.geometry) && r.route.geometry.length > 0) {
                     positions = r.route.geometry;
                  } else {
                     // Fallback mock geometry
                     positions = [
                       [originCoords.latitude, originCoords.longitude], 
                       [originCoords.latitude + 0.01 * (i+1), originCoords.longitude + 0.01 * (i+1)], 
                       [destCoords.latitude, destCoords.longitude]
                     ];
                  }

                  return (
                    <Polyline 
                      key={i} 
                      positions={positions} 
                      color={isSelected ? "#10b981" : getRouteColor(i)} 
                      weight={isSelected ? 6 : 4} 
                      opacity={isSelected ? 1 : 0.6} 
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
                const isSelected = r.route.route_id === selectedRouteId;
                return (
                  <RouteComparisonCard 
                    key={i}
                    routeName={r.route.route_id ? r.route.route_id.replace('tomtom_route_', 'Route ') : `Route ${i+1}`}
                    badge={isRec ? "RECOMMENDED" : null} 
                    badgeType={isRec ? "recommended" : null} 
                    isSelected={isSelected} 
                    onClick={() => setSelectedRouteId(r.route.route_id)}
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
                const isSelected = r.route.route_id === selectedRouteId;
                return (
                  <RouteDetailRow 
                    key={i}
                    icon={GitMerge}
                    badge={isRec ? "RECOMMENDED" : (isSelected ? "SELECTED" : null)}
                    badgeType={isRec ? "recommended" : (isSelected ? "recommended" : null)}
                    routeName={r.route.route_id ? r.route.route_id.replace('tomtom_route_', 'Route ') : `Route ${i+1}`}
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
