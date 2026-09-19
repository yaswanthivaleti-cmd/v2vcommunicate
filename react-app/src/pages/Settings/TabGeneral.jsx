import React from 'react';

const TabGeneral = () => {
  return (
    <div className="set-tab-content">
      {/* Left Column */}
      <div className="set-col-left">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>Metropolitan Jurisdiction</h2>
              <p>Active regional node grouping and corridor telemetry ingestion.</p>
            </div>
            <div className="set-badge" style={{color: '#059669', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0'}}>Live Bus</div>
          </div>

          <div>
            <label className="set-label">Metropolitan Hub Boundary</label>
            <select className="set-select">
              <option>National Capital Region (Delhi-NCR) - Zone 1 Arterial</option>
            </select>
          </div>

          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
              <label className="set-label" style={{margin: 0}}>Active Corridors</label>
              <span style={{fontSize: 10, color: '#94a3b8', fontWeight: 600}}>5 active feeds</span>
            </div>
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              <span className="corridor-tag"><span className="dot green"></span> NH-44 Corridor</span>
              <span className="corridor-tag"><span className="dot green"></span> Ring Road (ITO)</span>
              <span className="corridor-tag"><span className="dot green"></span> Mathura Road</span>
              <span className="corridor-tag"><span className="dot green"></span> DND Flyway</span>
              <span className="corridor-tag"><span className="dot green"></span> Outer Ring Road</span>
              <button className="corridor-tag add">+ Add Corridor</button>
            </div>
          </div>

          <div style={{display: 'flex', gap: 24}}>
            <div className="set-input-group" style={{flex: 1}}>
              <label className="set-label">Telemetry Speed Metric</label>
              <div className="set-toggle-group">
                <button className="set-toggle-btn active">km/h</button>
                <button className="set-toggle-btn">mph</button>
              </div>
            </div>
            <div className="set-input-group" style={{flex: 1}}>
              <label className="set-label">Ingestion Polling Window</label>
              <div className="set-toggle-group">
                <button className="set-toggle-btn active">500ms</button>
                <button className="set-toggle-btn">5s</button>
                <button className="set-toggle-btn">Adaptive</button>
              </div>
            </div>
          </div>
        </div>

        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>AI Inference & ML Models</h2>
              <p>Spatio-temporal graph neural network calibration & retraining cycles.</p>
            </div>
            <div className="set-badge">94.6% Accuracy</div>
          </div>

          <div className="model-active-box">
            <div className="model-info">
              <span className="model-name">NeuralFlow-v4.2 <span className="badge active">ACTIVE</span></span>
              <span className="model-desc">ST-GCN Architecture with recursive Kalman state filter</span>
            </div>
            <button className="btn-link">Inspect Weights</button>
          </div>

          <div style={{display: 'flex', gap: 24}}>
            <div className="set-input-group" style={{flex: 1}}>
              <label className="set-label">Retraining Schedule</label>
              <select className="set-select">
                <option>Daily at 02:00 IST</option>
              </select>
            </div>
            <div className="set-input-group" style={{flex: 1}}>
              <div className="toggle-row-box">
                <div>
                  <span className="box-title">Auto-Fallback Drift</span>
                  <span className="box-desc">Revert baseline if error {'>'} 6%</span>
                </div>
                <div className="set-switch active"></div>
              </div>
            </div>
          </div>

          <div>
            <label className="set-label">Forecast Window Horizon</label>
            <div className="set-toggle-group horizon-toggles">
              <button className="set-toggle-btn">5 min</button>
              <button className="set-toggle-btn">10 min</button>
              <button className="set-toggle-btn active">15 min</button>
              <button className="set-toggle-btn">30 min</button>
              <button className="set-toggle-btn">60 min</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="set-col-right">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>Sensor Fleet & Edge Hardware</h2>
              <p>Inductive loops, CCTV AI, and V2X nodes.</p>
            </div>
            <div className="set-badge"><span className="dot green"></span> All Online</div>
          </div>

          <div className="hw-stats-row">
            <div className="hw-stat-box">
              <span className="hw-label">INDUCTIVE<br/>LOOPS</span>
              <span className="hw-val">1,420</span>
              <span className="hw-sub">1,428 installed</span>
            </div>
            <div className="hw-stat-box">
              <span className="hw-label">VISION AI</span>
              <span className="hw-val">248</span>
              <span className="hw-sub">CCTV cameras</span>
            </div>
            <div className="hw-stat-box">
              <span className="hw-label">V2X RSUS</span>
              <span className="hw-val">12</span>
              <span className="hw-sub">5.9 GHz DSRC</span>
            </div>
          </div>

          <div className="hw-list">
            <div className="hw-list-item">
              <span className="hw-list-label">Telemetry Heartbeat</span>
              <span className="hw-list-val">Every 30s</span>
            </div>
            <div className="hw-list-item">
              <span className="hw-list-label">Firmware Revision</span>
              <span className="hw-list-val" style={{color: '#059669', fontWeight: 600}}>TrafficCore v3.8.1</span>
            </div>
            <div className="hw-list-item">
              <span className="hw-list-label">Last Grid Calibration</span>
              <span className="hw-list-val">Today, 04:30 IST</span>
            </div>
          </div>

          <button className="btn-outline-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Run Hardware Diagnostics
          </button>
        </div>

        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>Alert Routing & Webhooks</h2>
              <p>Escalation targets and municipal API connections.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
          </div>

          <div className="toggle-row-spaced">
            <div>
              <span className="box-title">Push to Field Squads</span>
              <span className="box-desc">Instant dispatch via mobile responder app</span>
            </div>
            <div className="set-switch active"></div>
          </div>

          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
              <label className="set-label" style={{margin: 0}}>Traffic Police Webhook</label>
              <span style={{fontSize: 10, color: '#059669', fontWeight: 700}}>HTTP 200 OK</span>
            </div>
            <div className="copy-input-box">
              <span className="copy-text">https://api.delhitrafficpolice.gov.in/v2/</span>
              <button className="btn-copy">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabGeneral;
