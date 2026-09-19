import React from 'react';
import './CardStyles.css';
import { BarChart2, Users, CloudRain, Clock, AlertTriangle } from 'lucide-react';

const ForecastCard = () => {
  return (
    <div className="bottom-card">
      <div className="card-header">
        <BarChart2 size={16} className="card-icon purple" />
        <span className="card-title">TRAFFIC FORECAST</span>
        <span className="badge-gray">NH-44</span>
      </div>
      
      <div>
        <div className="forecast-subtitle">Expected to get heavier</div>
        <span className="forecast-sub">in ~10 minutes</span>
      </div>
      
      <div className="timeline">
        <div className="time-point">
          <div className="time-dot now"></div>
          <span className="time-label">NOW</span>
          <span className="time-val">18 km/h</span>
        </div>
        <div className="time-point">
          <div className="time-dot m5"></div>
          <span className="time-label">+5 MIN</span>
          <span className="time-val">15 km/h</span>
        </div>
        <div className="time-point">
          <div className="time-dot m10"></div>
          <span className="time-label">+10 MIN</span>
          <span className="time-val">12 km/h</span>
        </div>
        <div className="time-point">
          <div className="time-dot m15"></div>
          <span className="time-label">+15 MIN</span>
          <span className="time-val">10 km/h</span>
        </div>
      </div>
      
      <div className="reasons">
        <div className="reason-title">Why is this happening?</div>
        <div className="reason-item"><Users size={12} /> Traffic volume inc...</div>
        <div className="reason-item"><Clock size={12} /> Peak-hour pattern</div>
        <div className="reason-item"><CloudRain size={12} /> Light rain</div>
        <div className="reason-item"><AlertTriangle size={12} color="#f59e0b" /> Possible incident</div>
      </div>
    </div>
  );
};

export default ForecastCard;
