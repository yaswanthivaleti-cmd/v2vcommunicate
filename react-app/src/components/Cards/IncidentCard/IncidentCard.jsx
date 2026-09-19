import React from 'react';
import './IncidentCard.css';
import { AlertTriangle, MapPin, Clock, Users } from 'lucide-react';

const IncidentCard = ({ title, severity, status, location, description, detected, confirming, clearTime, delayImpact }) => {
  return (
    <div className="incident-card">
      <div className="inc-icon-box">
        <AlertTriangle size={20} className="inc-icon" />
      </div>
      
      <div className="inc-content">
        <div className="inc-header">
          <h3 className="inc-title">{title}</h3>
          <div className="inc-badges">
            <span className={`inc-badge severity ${severity.includes('HIGH') ? 'high' : severity.includes('MED') ? 'med' : 'low'}`}>
              <span className="inc-dot"></span> {severity}
            </span>
            <span className={`inc-badge status ${status.toLowerCase()}`}>{status}</span>
          </div>
        </div>

        <div className="inc-location">
          <MapPin size={12} />
          {location}
        </div>

        <p className="inc-desc">{description}</p>

        <div className="inc-metrics">
          <div className="inc-metric">
            <Clock size={12} />
            DETECTED {detected}
          </div>
          <div className="inc-metric">
            <Users size={12} />
            {confirming} CONFIRMING
          </div>
          <div className="inc-metric clear-time">
            {clearTime}
          </div>
        </div>

        <div className="inc-impact-tag">
          {delayImpact}
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
