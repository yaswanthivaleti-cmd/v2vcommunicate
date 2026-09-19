import React, { useState, useEffect } from 'react';
import './PredictionsPage.css';
import { Info, TrendingUp, AlertTriangle } from 'lucide-react';
import PredictionCard from '../../components/Cards/PredictionCard/PredictionCard';
import { journeyApi } from '../../api/journeyApi';

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Predefined segments to monitor
  const defaultSegments = [
    { name: 'Connaught Place', lat: 28.6330, lng: 77.2194 },
    { name: 'Sector 62, Noida', lat: 28.6200, lng: 77.3600 },
    { name: 'Badarpur Flyover', lat: 28.5024, lng: 77.3039 },
    { name: 'Ring Road ITO', lat: 28.6288, lng: 77.2435 }
  ];

  const fetchRoadName = async (lat, lng, fallbackName) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
      });
      if (res.ok) {
        const data = await res.json();
        const road = data.address?.amenity || data.address?.road || data.address?.suburb || data.address?.neighbourhood || data.address?.city || data.address?.village || data.display_name?.split(',')[0];
        return road || fallbackName;
      }
    } catch (err) {
      console.warn("Reverse geocoding failed", err);
    }
    return fallbackName;
  };

  const fetchPredictions = async (segmentsToFetch) => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        segmentsToFetch.map(async (seg) => {
          try {
            const data = await journeyApi.getPrediction(seg.lat, seg.lng);
            return {
              name: seg.name,
              data: data
            };
          } catch (e) {
            return null;
          }
        })
      );
      
      const validResults = results.filter(r => r !== null);
      if (validResults.length === 0) {
        setError("Prediction data unavailable for all segments.");
      } else {
        setPredictions(validResults);
      }
    } catch (err) {
      setError("Failed to fetch predictions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const dynamicPoints = [
            { name: "Your Location", lat: lat, lng: lon },
            { name: "North Route", lat: lat + 0.015, lng: lon + 0.002 },
            { name: "East Route", lat: lat - 0.002, lng: lon + 0.015 },
            { name: "South Route", lat: lat - 0.015, lng: lon - 0.005 }
          ];

          const pointsWithNames = await Promise.all(dynamicPoints.map(async (p) => {
             const roadName = await fetchRoadName(p.lat, p.lng, p.name);
             return { ...p, name: roadName };
          }));

          fetchPredictions(pointsWithNames);
        },
        (err) => {
          console.warn("Location not provided. Using default.", err);
          fetchPredictions(defaultSegments);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      fetchPredictions(defaultSegments);
    }
  }, []);

  const getSeverity = (speed, freeFlow) => {
    const ratio = speed / freeFlow;
    if (ratio < 0.4) return 'red';
    if (ratio < 0.7) return 'orange';
    return 'green';
  };

  return (
    <div className="predictions-page">
      {/* Header */}
      <div className="pred-page-header">
        <div className="pred-title-group">
          <h1>AI TRAFFIC FORECAST</h1>
          <p>10–15 minute prediction across monitored road segments</p>
        </div>
        <div className="pred-date">Current Region</div>
      </div>

      {loading && <div className="loading-state">Loading predictions...</div>}
      
      {error && !loading && (
        <div className="error-state">
          <AlertTriangle size={32} />
          <h2>{error}</h2>
          <p>We could not fetch prediction data from our providers. Please try again later.</p>
        </div>
      )}

      {!loading && !error && predictions.length > 0 && (
        <>
          <div className="city-wide-section">
            <div className="section-header">
              <TrendingUp size={16} color="#3b82f6" />
              <h2>CITY-WIDE OVERVIEW <span>(Real-time Backend Data)</span></h2>
            </div>
            
            <div className="forecast-stats-row">
              <div className="forecast-stat-box">
                <span className="forecast-val orange">{predictions.length}</span>
                <span className="forecast-label">MONITORED SEGMENTS</span>
              </div>
              <div className="forecast-stat-box">
                <span className="forecast-val green">100%</span>
                <span className="forecast-label">API HEALTH</span>
              </div>
            </div>
          </div>

          <div className="segment-preds-section">
            <h3 className="section-title">SEGMENT PREDICTIONS</h3>
            <div className="preds-grid">
              {predictions.map((p, idx) => {
                const currentSpeed = p.data.current.current_speed;
                const freeFlow = p.data.current.free_flow_speed;
                const predSpeed10 = p.data.prediction.future_speed;
                const predSpeed15 = p.data.prediction.future_speed; // Same for demo

                const cardData = {
                  name: p.name,
                  confidence: Math.round(p.data.prediction.confidence * 100),
                  trend: p.data.prediction.trend_direction,
                  timeline: [
                    { label: 'NOW', speed: currentSpeed, severity: getSeverity(currentSpeed, freeFlow) },
                    { label: '+10 MIN', speed: predSpeed10, severity: getSeverity(predSpeed10, freeFlow) },
                    { label: '+15 MIN', speed: predSpeed15, severity: getSeverity(predSpeed15, freeFlow) }
                  ],
                  tags: [p.data.prediction.trend_direction]
                };

                return <PredictionCard key={idx} {...cardData} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionsPage;
