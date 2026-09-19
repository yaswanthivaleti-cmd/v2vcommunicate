import React from 'react';
import './RouteComparisonCard.css';
import { CheckCircle2, Clock, Navigation2, Activity, AlertCircle, CreditCard } from 'lucide-react';

const RouteComparisonCard = ({ routeName, badge, badgeType, isSelected, eta, distance, traffic, delay, toll, onClick }) => {
  return (
    <div className={`route-comp-card ${isSelected ? 'selected' : ''}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <div className="card-title-group">
          <span className="route-name">{routeName}</span>
          <span className={`route-badge ${badgeType}`}>{badge}</span>
        </div>
        {isSelected && <CheckCircle2 size={20} className="check-icon" color="#2563eb" fill="#eff6ff" />}
      </div>

      <div className="route-details-list">
        <div className="detail-row">
          <div className="detail-label"><Clock size={14} /> ETA</div>
          <div className="detail-val bold">{eta}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label"><Navigation2 size={14} /> Distance</div>
          <div className="detail-val">{distance}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label"><Activity size={14} /> Traffic</div>
          <div className={`detail-val traffic-badge ${traffic.toLowerCase()}`}>{traffic}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label"><AlertCircle size={14} /> Delay</div>
          <div className={`detail-val ${delay !== 'None' ? 'has-delay' : 'no-delay'}`}>{delay}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label"><CreditCard size={14} /> Toll</div>
          <div className="detail-val bold">{toll}</div>
        </div>
      </div>

      <button className={`select-route-btn ${isSelected ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
        {isSelected ? 'Current Selection' : 'Select Route'}
      </button>
    </div>
  );
};

export default RouteComparisonCard;
