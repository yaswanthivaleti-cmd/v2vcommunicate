import React from 'react';
import './CardStyles.css';
import { AlertTriangle, Play, Check } from 'lucide-react';

const RecommendationCard = ({ setActivePage }) => {
  return (
    <div className="bottom-card">
      <div className="card-header">
        <AlertTriangle size={16} className="card-icon green" />
        <span className="card-title">RECOMMENDATION</span>
      </div>
      
      <div className="rec-badge">RECOMMENDED ROUTE</div>
      
      <div>
        <span className="rec-main">34 min</span>
        <span className="rec-sub">18.4 km</span>
      </div>
      
      <div className="rec-benefit">
        <Check size={12} />
        ~7 min faster
      </div>
      
      <p className="rec-desc">
        This alternative avoids predicted congestion.
      </p>
      
      <div className="rec-actions">
        <button className="btn-dark" onClick={() => setActivePage && setActivePage('Live Traffic')}>
          <Play size={14} fill="white" />
          Start Journey
        </button>
        <button className="btn-ghost" onClick={() => setActivePage && setActivePage('Route Planning')}>
          View Alternatives
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
