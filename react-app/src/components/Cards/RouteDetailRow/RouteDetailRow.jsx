import React from 'react';
import './RouteDetailRow.css';
import { ChevronRight } from 'lucide-react';

const RouteDetailRow = ({ icon: Icon, badge, badgeType, routeName, time, distance, traffic, delay, toll, via }) => {
  return (
    <div className={`route-detail-row ${badgeType === 'recommended' ? 'active' : ''}`}>
      <div className={`route-icon-box ${badgeType}`}>
        <Icon size={18} />
      </div>
      
      <div className="route-detail-content">
        <div className="route-detail-header">
          <span className={`route-badge ${badgeType}`}>{badge}</span>
          <span className="route-name">{routeName}</span>
        </div>
        
        <div className="route-detail-metrics">
          <span className="metric-time">{time}</span>
          <span className="metric-dot">·</span>
          <span className="metric-dist">{distance}</span>
          <span className="metric-dot">·</span>
          <span className={`metric-traffic ${traffic.toLowerCase()}`}>
            <span className="traffic-dot"></span> {traffic}
          </span>
          <span className="metric-delay">Delay: {delay}</span>
          {toll && (
            <>
              <span className="metric-dot">·</span>
              <span className="metric-toll">Toll: {toll}</span>
            </>
          )}
        </div>

        <div className="route-detail-via">
          <span className="via-icon">○</span> Via {via}
        </div>
      </div>

      <button className="chevron-btn">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default RouteDetailRow;
