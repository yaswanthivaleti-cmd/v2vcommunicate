import React from 'react';
import './Header.css';
import { ShieldAlert, Wifi, Bell, Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <ShieldAlert size={20} className="logo-icon" />
          </div>
          <span className="logo-text">TrafficAI</span>
        </div>
        <span className="subtitle">INTELLIGENCE COMMAND</span>
      </div>

      <div className="header-center">
        <span className="datetime">FRIDAY, SEP 18 • 14:32:08 IST</span>
      </div>

      <div className="header-right">
        <div className="system-status">
          <Wifi size={14} className="status-icon" />
          <span>All Systems Active</span>
        </div>

        <div className="action-icons">
          <button className="icon-btn notification-btn">
            <Bell size={20} />
            <span className="badge">8</span>
          </button>
          <button className="icon-btn">
            <Heart size={20} />
          </button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-role">Traffic Analyst</span>
            <div className="user-score-row">
              <span className="score-label">SCORE: </span>
              <span className="score-value">100</span>
              <span className="history-link">History</span>
            </div>
          </div>
          <div className="user-avatar">H</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
