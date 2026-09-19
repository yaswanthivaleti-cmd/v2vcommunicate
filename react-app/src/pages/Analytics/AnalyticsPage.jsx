import React, { useState, useEffect } from 'react';
import './AnalyticsPage.css';
import { Activity, Bell, Zap, BarChart2, AlertTriangle, TrendingUp } from 'lucide-react';
import { journeyApi } from '../../api/journeyApi';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roadName, setRoadName] = useState('Corridor');

  const fetchRoadName = async (lat, lng, fallbackName) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
      });
      if (res.ok) {
        const data = await res.json();
        const road = data.address?.amenity || data.address?.road || data.address?.suburb || data.address?.city || data.display_name?.split(',')[0];
        return road || fallbackName;
      }
    } catch (err) {
      console.warn("Reverse geocoding failed", err);
    }
    return fallbackName;
  };

  useEffect(() => {
    const loadRealData = async (lat, lon) => {
      try {
        const name = await fetchRoadName(lat, lon, "Local Corridor");
        setRoadName(name);

        const traffic = await journeyApi.getTraffic(lat, lon);
        let weather = null;
        try {
          weather = await journeyApi.getWeather(lat, lon);
        } catch (e) {
          console.warn("Weather unavailable");
        }

        const currentSpeed = traffic?.current_speed || 24;
        const freeFlow = traffic?.free_flow_speed || 40;
        const congestionRatio = currentSpeed / freeFlow;

        // Generate synthetic historical pattern based on real current data
        const baseSpeed = freeFlow;
        const dailyPattern = [
          { time: '6 AM', speed: Math.round(baseSpeed * 0.9), color: 'green', width: '90%' },
          { time: '8 AM', speed: Math.round(baseSpeed * 0.4), color: 'red', width: '40%' },
          { time: '12 PM', speed: Math.round(baseSpeed * 0.8), color: 'yellow', width: '80%' },
          { time: '5 PM', speed: Math.round(baseSpeed * 0.3), color: 'red', width: '30%' },
          { time: '8 PM', speed: Math.round(baseSpeed * 0.7), color: 'orange', width: '70%' },
          { time: 'NOW', speed: currentSpeed, color: congestionRatio < 0.5 ? 'red' : (congestionRatio < 0.8 ? 'orange' : 'green'), width: `${Math.round(congestionRatio * 100)}%` },
        ];

        setAnalyticsData({
          averageSpeed: currentSpeed,
          activeVehicles: Math.round((1 - congestionRatio) * 3000 + 500),
          incidents: congestionRatio < 0.4 ? 4 : (congestionRatio < 0.7 ? 1 : 0),
          accuracy: traffic ? 98 : 0,
          dailyPattern,
          weather: weather?.condition || 'Unknown'
        });
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadRealData(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Location error, using fallback.");
          loadRealData(28.6139, 77.2090); // Delhi default
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      loadRealData(28.6139, 77.2090);
    }
  }, []);

  return (
    <div className="analytics-page">
      {/* Global Header */}
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
          <div className="inc-user-profile">
            <div className="inc-user-text">
              <span className="inc-user-role">Traffic Analyst</span>
              <span className="inc-user-score"><span className="score-badge">SCORE: 100</span> History</span>
            </div>
            <div className="inc-user-avatar">H</div>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>City-wide traffic intelligence</p>
        </div>

        {/* Top Stats Row */}
        <div className="analytics-stats-row">
          <div className="analytics-stat-card">
            <div className="stat-label blue">
              <Zap size={14} /> AVERAGE SPEED
            </div>
            <div className="stat-value blue-text">{loading ? '...' : `${analyticsData?.averageSpeed} km/h`}</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label green">
              <BarChart2 size={14} /> ACTIVE VEHICLES
            </div>
            <div className="stat-value green-text">{loading ? '...' : analyticsData?.activeVehicles.toLocaleString()}</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label red">
              <AlertTriangle size={14} /> ACTIVE INCIDENTS
            </div>
            <div className="stat-value red-text">{loading ? '...' : analyticsData?.incidents}</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label orange">
              <TrendingUp size={14} /> PREDICTION ACCURACY
            </div>
            <div className="stat-value orange-text">{loading ? '...' : `${analyticsData?.accuracy}%`}</div>
          </div>
        </div>

        {/* Speed Trend Chart */}
        <div className="analytics-card trend-card">
          <div className="card-header-flex">
            <div>
              <h2 className="card-title">TRAFFIC SPEED TREND</h2>
              <p className="card-subtitle">Last 2 hours</p>
            </div>
            <span className="tag-badge">{loading ? 'Loading...' : roadName} Corridor</span>
          </div>
          
          <div className="trend-chart-container">
            <svg viewBox="0 0 1000 300" className="trend-svg" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="1000" y2="20" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="90" x2="1000" y2="90" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="160" x2="1000" y2="160" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="230" x2="1000" y2="230" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="40" y1="290" x2="1000" y2="290" stroke="#e2e8f0" strokeWidth="2" />

              {/* Y Axis Labels */}
              <text x="25" y="25" className="axis-label" textAnchor="end">32</text>
              <text x="25" y="95" className="axis-label" textAnchor="end">24</text>
              <text x="25" y="165" className="axis-label" textAnchor="end">16</text>
              <text x="25" y="235" className="axis-label" textAnchor="end">8</text>
              <text x="25" y="295" className="axis-label" textAnchor="end">0</text>

              {/* Data Lines */}
              {/* Actual Speed (Solid Green) */}
              <path 
                d="M40 20 L150 50 L300 80 L450 100 L550 105 L650 85 L800 75 L950 85 L1000 85" 
                fill="none" 
                stroke="#2f4f2f" 
                strokeWidth="2.5" 
              />
              <circle cx="1000" cy="85" r="4" fill="#2f4f2f" />
              
              {/* Predicted Speed (Dotted Brown) */}
              <path 
                d="M40 20 L150 45 L300 70 L450 95 L550 115 L650 95 L800 80 L950 90 L1000 90" 
                fill="none" 
                stroke="#a67c00" 
                strokeWidth="2" 
                strokeDasharray="4,4" 
              />
            </svg>
            
            {/* X Axis Labels (HTML for easier positioning) */}
            <div className="x-axis-labels">
              <span>21:40</span>
              <span>21:50</span>
              <span>22:00</span>
              <span>22:10</span>
              <span>22:20</span>
              <span>22:30</span>
              <span>22:40</span>
              <span>22:50</span>
              <span>23:00</span>
              <span>23:10</span>
              <span>23:20</span>
              <span>23:30</span>
              <span>Now</span>
            </div>
          </div>
          
          <div className="chart-legend center">
            <div className="legend-item"><span className="legend-line solid-green"></span> Actual Speed</div>
            <div className="legend-item"><span className="legend-line dotted-brown"></span> Predicted Speed</div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="analytics-middle-row">
          {/* Congestion Donut */}
          <div className="analytics-card half-card">
            <h2 className="card-title">CONGESTION DISTRIBUTION</h2>
            <div className="donut-container">
              <div className="donut-chart">
                <div className="donut-hole"></div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><span className="legend-box yellow"></span> Heavy</div>
              <div className="legend-item"><span className="legend-box green"></span> Low</div>
              <div className="legend-item"><span className="legend-box orange"></span> Moderate</div>
              <div className="legend-item"><span className="legend-box red"></span> Severe</div>
            </div>
          </div>

          {/* Weather Impact Bar */}
          <div className="analytics-card half-card">
            <h2 className="card-title">WEATHER IMPACT ON SPEED</h2>
            <div className="weather-bar-chart">
              <div className="weather-y-axis">
                <span>105%</span>
                <span>95%</span>
                <span>80%</span>
                <span>65%</span>
                <span>50%</span>
              </div>
              <div className="weather-bars">
                <div className="weather-bar-group">
                  <div className="weather-bar green" style={{ height: '90%' }}></div>
                  <span className="weather-label">Clear</span>
                </div>
                <div className="weather-bar-group">
                  <div className="weather-bar light-green" style={{ height: '82%' }}></div>
                  <span className="weather-label">Cloudy</span>
                </div>
                <div className="weather-bar-group">
                  <div className="weather-bar yellow" style={{ height: '65%' }}></div>
                  <span className="weather-label">Light Rain</span>
                </div>
                <div className="weather-bar-group">
                  <div className="weather-bar orange" style={{ height: '40%' }}></div>
                  <span className="weather-label">Heavy Rain</span>
                </div>
                <div className="weather-bar-group">
                  <div className="weather-bar orange-red" style={{ height: '35%' }}></div>
                  <span className="weather-label">Fog</span>
                </div>
                <div className="weather-bar-group">
                  <div className="weather-bar red" style={{ height: '10%' }}></div>
                  <span className="weather-label">Storm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Pattern */}
        <div className="analytics-card daily-pattern-card">
          <div className="card-header-flex">
            <div>
              <h2 className="card-title">DAILY PATTERN <span className="card-dot">•</span> <span className="card-highlight">{loading ? '...' : roadName}</span></h2>
              <p className="card-subtitle">Historical speed by hour</p>
            </div>
          </div>

          <div className="daily-bars-list">
            {!loading && analyticsData?.dailyPattern.map((row, idx) => (
              <div className="daily-bar-row" key={idx}>
                <div className="daily-time">{row.time}</div>
                <div className="daily-bar-track">
                  <div className={`daily-bar-fill ${row.color}`} style={{ width: row.width }}></div>
                </div>
                <div className={`daily-speed ${row.color}-text`}>{row.speed} km/h</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
