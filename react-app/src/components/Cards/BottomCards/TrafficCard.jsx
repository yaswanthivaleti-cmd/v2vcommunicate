import React from 'react';
import './CardStyles.css';
import { Bookmark, TrendingUp } from 'lucide-react';

const TrafficCard = () => {
  return (
    <div className="bottom-card">
      <div className="card-header">
        <Bookmark size={16} className="card-icon blue" />
        <span className="card-title">CURRENT TRAFFIC</span>
      </div>
      
      <div className="status-orange">MODERATE</div>
      
      <div>
        <span className="speed-text">32 km/h</span>
        <span className="speed-label"> avg speed</span>
      </div>
      
      <div className="trend-text">
        <TrendingUp size={16} />
        Traffic is increasing
      </div>
      
      <div className="card-footer-text">
        Updated 2 min ago
      </div>
    </div>
  );
};

export default TrafficCard;
