import React from 'react';
import './PredictionsPage.css';
import { Info, TrendingUp } from 'lucide-react';
import PredictionCard from '../../components/Cards/PredictionCard/PredictionCard';

const PredictionsPage = () => {
  const predictionData = [
    {
      name: 'NH-44 (Ashram Chowk)',
      confidence: 87,
      trend: 'Worsening',
      timeline: [
        { label: 'NOW', speed: 18, severity: 'red' },
        { label: '+10 MIN', speed: 12, severity: 'orange' },
        { label: '+15 MIN', speed: 10, severity: 'red' }
      ],
      tags: ['peak hour', 'incident nearby']
    },
    {
      name: 'Ring Road (ITO)',
      confidence: 82,
      trend: 'Improving',
      timeline: [
        { label: 'NOW', speed: 12, severity: 'red' },
        { label: '+10 MIN', speed: 10, severity: 'red' },
        { label: '+15 MIN', speed: 17, severity: 'orange' }
      ],
      tags: ['incident clearing', 'post-peak']
    },
    {
      name: 'Mathura Road',
      confidence: 79,
      trend: 'Worsening',
      timeline: [
        { label: 'NOW', speed: 28, severity: 'orange' },
        { label: '+10 MIN', speed: 26, severity: 'orange' },
        { label: '+15 MIN', speed: 20, severity: 'red' }
      ],
      tags: ['evening peak approaching']
    },
    {
      name: 'Outer Ring Road (Sarita Vihar)',
      confidence: 91,
      trend: 'Stable',
      timeline: [
        { label: 'NOW', speed: 45, severity: 'green' },
        { label: '+10 MIN', speed: 44, severity: 'green' },
        { label: '+15 MIN', speed: 32, severity: 'orange' }
      ],
      tags: ['no incidents', 'light rain expected']
    },
    {
      name: 'Badarpur Flyover',
      confidence: 85,
      trend: 'Improving',
      timeline: [
        { label: 'NOW', speed: 8, severity: 'red' },
        { label: '+10 MIN', speed: 15, severity: 'orange' },
        { label: '+15 MIN', speed: 22, severity: 'green' }
      ],
      tags: ['incident resolving', 'vehicles dispersing']
    },
    {
      name: 'Mehrauli-Badarpur Road',
      confidence: 74,
      trend: 'Worsening',
      timeline: [
        { label: 'NOW', speed: 22, severity: 'orange' },
        { label: '+10 MIN', speed: 16, severity: 'orange' },
        { label: '+15 MIN', speed: 15, severity: 'red' }
      ],
      tags: ['rain', 'school dispersal']
    },
    {
      name: 'Nizamuddin Bridge',
      confidence: 88,
      trend: 'Stable',
      timeline: [
        { label: 'NOW', speed: 15, severity: 'orange' },
        { label: '+10 MIN', speed: 14, severity: 'orange' },
        { label: '+15 MIN', speed: 24, severity: 'green' }
      ],
      tags: []
    }
  ];

  return (
    <div className="predictions-page">
      {/* Header */}
      <div className="pred-page-header">
        <div className="pred-title-group">
          <h1>AI TRAFFIC FORECAST</h1>
          <p>10–15 minute prediction across monitored road segments</p>
        </div>
        <div className="pred-date">FRIDAY, SEP 18</div>
      </div>

      {/* Info Alert */}
      <div className="pred-info-alert">
        <Info size={18} className="info-icon" />
        <div className="info-text">
          <strong>SIMULATED PREDICTION</strong> Predictions are deterministically simulated from mock data for this live demo. The production system uses historical speed data, weather, and real-time anomaly detection to feed the AI models.
        </div>
      </div>

      {/* City-Wide Forecast Section */}
      <div className="city-wide-section">
        <div className="section-header">
          <TrendingUp size={16} color="#3b82f6" />
          <h2>CITY-WIDE FORECAST <span>(Next 15 Min)</span></h2>
        </div>
        
        <div className="forecast-stats-row">
          <div className="forecast-stat-box">
            <span className="forecast-val orange">22 km/h</span>
            <span className="forecast-label">PREDICTED AVG</span>
          </div>
          <div className="forecast-stat-box">
            <span className="forecast-val red">3 roads</span>
            <span className="forecast-label">HOTSPOTS</span>
          </div>
          <div className="forecast-stat-box">
            <span className="forecast-val green">83%</span>
            <span className="forecast-label">CONFIDENCE</span>
          </div>
        </div>
      </div>

      {/* Segment Predictions Grid */}
      <div className="segment-preds-section">
        <h3 className="section-title">SEGMENT PREDICTIONS</h3>
        <div className="preds-grid">
          {predictionData.map((data, idx) => (
            <PredictionCard key={idx} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
