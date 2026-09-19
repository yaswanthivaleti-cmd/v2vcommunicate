import React from 'react';
import './SegmentCard.css';

const SegmentCard = ({ name, badge, severity, currentSpeed, expectedSpeed, congestion, vehicles, time }) => {
  return (
    <div className="segment-card">
      <div className="segment-header">
        <div className="segment-title-group">
          <span className="segment-name">{name}</span>
          {badge && <span className="segment-badge">{badge}</span>}
        </div>
        <span className={`severity-badge ${severity.toLowerCase()}`}>{severity}</span>
      </div>

      <div className="segment-speeds">
        <div className="speed-col">
          <span className="speed-label">Current Speed</span>
          <div className="speed-val-group">
            <span className={`speed-val ${severity.toLowerCase()}`}>{currentSpeed}</span>
            <span className="speed-unit">km/h</span>
          </div>
        </div>
        <div className="speed-col">
          <span className="speed-label">Expected</span>
          <div className="speed-val-group">
            <span className="speed-val">{expectedSpeed}</span>
            <span className="speed-unit">km/h</span>
          </div>
        </div>
      </div>

      <div className="congestion-section">
        <span className="congestion-label">CONGESTION</span>
        <div className="progress-bar-container">
          <div className={`progress-fill ${severity.toLowerCase()}`} style={{ width: `${congestion}%` }}></div>
        </div>
        <span className="congestion-pct">{congestion}%</span>
      </div>

      <div className="segment-footer">
        {vehicles} vehicles · Updated {time}
      </div>
    </div>
  );
};

export default SegmentCard;
