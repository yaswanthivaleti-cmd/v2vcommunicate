import React from 'react';
import './AlertCard.css';

const AlertCard = ({ setActivePage }) => {
  return (
    <div className="alert-card">
      <div className="alert-header">
        <div className="alert-title-group">
          <span className="orange-dot"></span>
          <span className="alert-title">((•)) V2V SIGNAL DETECTED</span>
        </div>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="alert-content">
        <h3 className="alert-heading">Possible hazard detected ahead</h3>
        <p className="alert-subheading">A connected vehicle reported sudden braking 1.2 km ahead.</p>
        
        <div className="prediction-box">
          <span className="prediction-label">TRAFFICAI PREDICTION</span>
          <p className="prediction-text">Traffic may slow significantly in the next 5–10 minutes.</p>
        </div>

        <div className="action-stats-row">
          <div className="stat-box current">
            <span className="stat-title">CURRENT</span>
            <span className="stat-value">+18 min delay</span>
          </div>
          <div className="stat-box alternative">
            <span className="stat-title">ALTERNATIVE</span>
            <span className="stat-value">Saves ~7 min</span>
          </div>
        </div>

        <div className="alert-actions">
          <button className="primary-action-btn" onClick={() => setActivePage && setActivePage('Route Planning')}>Switch Route ›</button>
          <button className="ghost-action-btn">Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
