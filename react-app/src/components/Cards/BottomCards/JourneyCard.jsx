import React from 'react';
import './CardStyles.css';
import { TrendingUp, Clock } from 'lucide-react';

const JourneyCard = () => {
  return (
    <div className="bottom-card">
      <div className="card-header">
        <TrendingUp size={16} className="card-icon purple" />
        <span className="card-title">YOUR JOURNEY</span>
      </div>
      
      <div className="delay-box">
        <span className="delay-label">POTENTIAL DELAY</span>
        <div className="delay-val">
          <Clock size={20} />
          +8 min
        </div>
      </div>
      
      <div className="eta-row">
        <div className="eta-col">
          <span className="eta-label">CURRENT ETA</span>
          <span className="eta-val">34 min</span>
        </div>
        <div className="eta-col" style={{ alignItems: 'flex-end' }}>
          <span className="eta-label">PREDICTED ETA</span>
          <span className="eta-val red">42 min</span>
        </div>
      </div>
      
      <div className="card-footer-text" style={{ textAlign: 'center' }}>
        Live updates active
      </div>
    </div>
  );
};

export default JourneyCard;
