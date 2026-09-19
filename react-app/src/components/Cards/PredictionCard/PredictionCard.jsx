import React from 'react';
import './PredictionCard.css';
import { TrendingDown, TrendingUp, Minus, AlertTriangle } from 'lucide-react';

const PredictionCard = ({ name, confidence, trend, timeline, tags }) => {
  const getTrendIcon = () => {
    if (trend === 'Worsening') return <TrendingDown size={14} className="trend-icon red" />;
    if (trend === 'Improving') return <TrendingUp size={14} className="trend-icon green" />;
    return <Minus size={14} className="trend-icon gray" />;
  };

  return (
    <div className="prediction-card">
      <div className="pred-card-header">
        <span className="pred-road-name">{name}</span>
        <div className="pred-confidence-group">
          <span className={`pred-confidence-val ${confidence >= 80 ? 'green' : 'orange'}`}>
            {confidence}%
          </span>
          <span className="pred-confidence-label">confidence</span>
        </div>
      </div>

      <div className={`pred-trend ${trend.toLowerCase()}`}>
        {getTrendIcon()}
        <span>{trend}</span>
      </div>

      <div className="pred-timeline-section">
        <div className="timeline-line"></div>
        <div className="timeline-points">
          {timeline.map((pt, idx) => (
            <div key={idx} className="timeline-pt-col">
              <span className="pt-label">{pt.label}</span>
              <div className={`pt-dot ${pt.severity}`}></div>
              <div className="pt-speed-group">
                <span className="pt-speed">{pt.speed}</span>
                <span className="pt-unit">km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pred-tags-row">
        {tags.map((tag, idx) => (
          <span key={idx} className="pred-tag">{tag}</span>
        ))}
      </div>

      <div className="pred-card-footer">
        <AlertTriangle size={12} className="footer-icon" />
        Simulated prediction — prototype only
      </div>
    </div>
  );
};

export default PredictionCard;
