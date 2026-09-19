import React from 'react';
import './AnalyticsPage.css';
import { Activity, Bell, Heart, Zap, BarChart2, AlertTriangle, TrendingUp } from 'lucide-react';

const AnalyticsPage = () => {
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
          <button className="inc-icon-btn">
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
            <div className="stat-value blue-text">24 km/h</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label green">
              <BarChart2 size={14} /> ACTIVE VEHICLES
            </div>
            <div className="stat-value green-text">1,248</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label red">
              <AlertTriangle size={14} /> ACTIVE INCIDENTS
            </div>
            <div className="stat-value red-text">7</div>
          </div>
          <div className="analytics-stat-card">
            <div className="stat-label orange">
              <TrendingUp size={14} /> PREDICTION ACCURACY
            </div>
            <div className="stat-value orange-text">94%</div>
          </div>
        </div>

        {/* Speed Trend Chart */}
        <div className="analytics-card trend-card">
          <div className="card-header-flex">
            <div>
              <h2 className="card-title">TRAFFIC SPEED TREND</h2>
              <p className="card-subtitle">Last 2 hours</p>
            </div>
            <span className="tag-badge">NH-44 Arterial Corridor</span>
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
              <h2 className="card-title">DAILY PATTERN <span className="card-dot">•</span> <span className="card-highlight">NH-44</span></h2>
              <p className="card-subtitle">Historical speed by hour</p>
            </div>
          </div>

          <div className="daily-bars-list">
            {[
              { time: '6 AM', speed: 28, color: 'yellow', width: '55%' },
              { time: '7 AM', speed: 18, color: 'orange', width: '45%' },
              { time: '8 AM', speed: 14, color: 'red', width: '38%' },
              { time: '12 PM', speed: 26, color: 'yellow', width: '52%' },
              { time: '5 PM', speed: 14, color: 'red', width: '38%' },
              { time: '6 PM', speed: 12, color: 'red', width: '35%' },
              { time: '7 PM', speed: 18, color: 'orange', width: '45%' },
              { time: '10 PM', speed: 36, color: 'green', width: '65%' },
            ].map((row, idx) => (
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
