import React from 'react';
import './IncidentsPage.css';
import IncidentCard from '../../components/Cards/IncidentCard/IncidentCard';
import { Search, RefreshCw, Bell, Heart, Activity } from 'lucide-react';

const IncidentsPage = () => {
  const incidentsData = [
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
          <button className="inc-tab active">
            <span className="tab-icon">⚠</span> ACTIVE <span className="tab-count">5</span>
          </button>
          <button className="inc-tab">
            <span className="tab-icon">✔</span> RESOLVED <span className="tab-count">2</span>
          </button>
        </div>

        {/* Grid */}
        <div className="inc-grid">
          {incidentsData.map((inc, idx) => (
            <IncidentCard key={idx} {...inc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
