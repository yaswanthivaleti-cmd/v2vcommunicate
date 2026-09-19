import React, { useState, useEffect } from 'react';
import './IncidentsPage.css';
import IncidentCard from '../../components/Cards/IncidentCard/IncidentCard';
import { Search, RefreshCw, Bell, Heart, Activity } from 'lucide-react';

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [resolvedIncidents, setResolvedIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ACTIVE');

  const defaultIncidentsData = [
    {
      title: "Ring Road (ITO)",
      severity: "HIGH SEVERITY",
      status: "ACTIVE",
      location: "Near ITO Junction",
      description: "Multi-vehicle collision. Emergency services on site.",
      detected: "2H AGO",
      confirming: "8",
      clearTime: "~20 MIN TO CLEAR",
      delayImpact: "+15 MIN DELAY IMPACT"
    },
    {
      title: "NH-44 (Ashram Chowk)",
      severity: "MED SEVERITY",
      status: "ACTIVE",
      location: "Near Ashram Chowk",
      description: "Unusual slowdown detected. Speed below threshold.",
      detected: "2H AGO",
      confirming: "12",
      clearTime: "~15 MIN TO CLEAR",
      delayImpact: "+8 MIN DELAY IMPACT"
    },
    {
      title: "Badarpur Flyover",
      severity: "LOW SEVERITY",
      status: "ACTIVE",
      location: "Entry ramp, Badarpur",
      description: "Road repair work. One lane blocked.",
      detected: "3H AGO",
      confirming: "6",
      clearTime: "~2 HOURS TO CLEAR",
      delayImpact: "+12 MIN DELAY IMPACT"
    },
    {
      title: "Nizamuddin Bridge",
      severity: "MED SEVERITY",
      status: "ACTIVE",
      location: "Nizamuddin Dargah approach",
      description: "Religious gathering causing pedestrian traffic on road.",
      detected: "2H AGO",
      confirming: "9",
      clearTime: "~45 MIN TO CLEAR",
      delayImpact: "+10 MIN DELAY IMPACT"
    },
    {
      title: "MB Road",
      severity: "LOW SEVERITY",
      status: "ACTIVE",
      location: "Sangam Vihar crossing",
      description: "Minor fender-bender. Vehicles partially blocking lane.",
      detected: "2H AGO",
      confirming: "5",
      clearTime: "~10 MIN TO CLEAR",
      delayImpact: "+5 MIN DELAY IMPACT"
    }
  ];

  const defaultResolvedData = [
    {
      title: "Phagwara Highway",
      severity: "RESOLVED",
      status: "RESOLVED",
      location: "Near JCT Mills",
      description: "Cleared: Broken down truck towed successfully.",
      detected: "12H AGO",
      confirming: "0",
      clearTime: "CLEARED",
      delayImpact: "NO DELAY"
    },
    {
      title: "Model Town",
      severity: "RESOLVED",
      status: "RESOLVED",
      location: "Main Market",
      description: "Cleared: Waterlogging subsided.",
      detected: "1D AGO",
      confirming: "0",
      clearTime: "CLEARED",
      delayImpact: "NO DELAY"
    }
  ];

  const fetchRoadName = async (lat, lng, fallbackName) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
      });
      if (res.ok) {
        const data = await res.json();
        const road = data.address?.amenity || data.address?.road || data.address?.suburb || data.address?.neighbourhood || data.address?.city || data.display_name?.split(',')[0];
        return road || fallbackName;
      }
    } catch (err) {
      console.warn("Reverse geocoding failed", err);
    }
    return fallbackName;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          const dynamicPoints = [
            { lat: lat + 0.01, lng: lon + 0.01 },
            { lat: lat - 0.015, lng: lon - 0.005 },
            { lat: lat + 0.02, lng: lon - 0.02 },
            { lat: lat - 0.01, lng: lon + 0.02 },
            { lat: lat, lng: lon - 0.03 }
          ];

          const names = await Promise.all(dynamicPoints.map((p, i) => fetchRoadName(p.lat, p.lng, defaultIncidentsData[i].title)));
          
          const newIncidents = defaultIncidentsData.map((inc, i) => ({
            ...inc,
            title: names[i],
            location: `Near ${names[i]}`
          }));
          
          const resolvedPoints = [
            { lat: lat + 0.03, lng: lon - 0.01 },
            { lat: lat - 0.02, lng: lon + 0.03 }
          ];
          const resolvedNames = await Promise.all(resolvedPoints.map((p, i) => fetchRoadName(p.lat, p.lng, defaultResolvedData[i].title)));
          
          const newResolved = defaultResolvedData.map((inc, i) => ({
            ...inc,
            title: resolvedNames[i],
            location: `Near ${resolvedNames[i]}`
          }));
          
          setIncidents(newIncidents);
          setResolvedIncidents(newResolved);
          setLoading(false);
        },
        (err) => {
          console.warn("Location not provided. Using default.", err);
          setIncidents(defaultIncidentsData);
          setResolvedIncidents(defaultResolvedData);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setIncidents(defaultIncidentsData);
      setResolvedIncidents(defaultResolvedData);
      setLoading(false);
    }
  }, []);

  return (
    <div className="incidents-page">
      {/* Global-style Header for this page */}
      <div className="inc-global-header">
        <span className="inc-header-date">FRIDAY, SEP 18</span>
        <div className="inc-header-right">
          <div className="inc-sys-status">
            <Activity size={14} className="sys-icon" />
            All Systems Active
          </div>
          <button className="inc-icon-btn" onClick={() => window.dispatchEvent(new CustomEvent('toggleNotifications'))}>
            <Bell size={18} />
            <span className="inc-bell-badge">8</span>
          </button>
          <button className="inc-icon-btn">
            <Heart size={18} />
          </button>
          <div className="inc-user-profile">
            <div className="inc-user-text">
              <span className="inc-user-role">Traffic Analyst</span>
              <span className="inc-user-score"><span className="score-badge">SCORE: 100</span> History</span>
            </div>
            <div className="inc-user-avatar">H</div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="inc-page-content">
        
        {/* Page Header */}
        <div className="inc-page-header">
          <div className="inc-title-section">
            <h1>INCIDENTS</h1>
            <p>Detected when speed falls below threshold across multiple vehicles</p>
          </div>
          <div className="inc-actions-section">
            <div className="inc-search-box">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Filter incidents..." />
            </div>
            <button className="inc-refresh-btn">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="inc-tabs-row">
          <button 
            className={`inc-tab ${activeTab === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => setActiveTab('ACTIVE')}
          >
            <span className="tab-icon">⚠</span> ACTIVE <span className="tab-count">{loading ? '-' : incidents.length}</span>
          </button>
          <button 
            className={`inc-tab ${activeTab === 'RESOLVED' ? 'active' : ''}`}
            onClick={() => setActiveTab('RESOLVED')}
          >
            <span className="tab-icon">✔</span> RESOLVED <span className="tab-count">{loading ? '-' : resolvedIncidents.length}</span>
          </button>
        </div>

        {/* Grid */}
        <div className="inc-grid">
          {loading ? (
            <div style={{ padding: '20px', color: '#64748b' }}>Locating nearby incidents...</div>
          ) : (
            (activeTab === 'ACTIVE' ? incidents : resolvedIncidents).map((inc, idx) => (
              <IncidentCard key={idx} {...inc} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
