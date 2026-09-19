import React from 'react';
import { Settings, Bell } from 'lucide-react';

const TabAlerts = () => {
  return (
    <div className="set-tab-content">
      {/* Left Column */}
      <div className="set-col-left">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>AUTONOMOUS INGESTION RULES</h2>
              <p>Escalation Protocols & Incident Thresholds</p>
            </div>
            <div style={{width: 32, height: 32, backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #e2e8f0'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
          </div>
          <p style={{fontSize: 13, color: '#475569', margin: '-12px 0 0 0', lineHeight: 1.5}}>
            Set algorithmic tolerances before high-priority routing overrides trigger automatic response units.
          </p>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <span style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Severity Escalation Trigger</span>
              <span className="set-badge">ACTIVE MONITOR</span>
            </div>
            <p style={{fontSize: 12, color: '#475569', lineHeight: 1.5, margin: '0 0 16px 0'}}>
              Trigger Level 3 incident state when a cluster meets the mathematical acceleration anomaly criteria:
            </p>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'white', padding: '12px 16px', borderRadius: 6, border: '1px solid #e2e8f0'}}>
              <div style={{color: '#059669'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div style={{flex: 1, fontSize: 13, color: '#1e293b'}}>
                ≥ 3 connected vehicles decelerating {'>'} 15 km/h²
              </div>
              <div style={{fontSize: 12, fontWeight: 600, color: '#475569', borderLeft: '1px solid #e2e8f0', paddingLeft: 12}}>
                Radius:<br/>300m
              </div>
            </div>
          </div>

          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
              <label className="set-label" style={{margin: 0}}>Congestion Delay Threshold</label>
              <span style={{fontSize: 11, color: '#475569'}}>Trigger rerouting recommendation</span>
            </div>
            <div className="set-toggle-group">
              <button className="set-toggle-btn">5 min</button>
              <button className="set-toggle-btn">10 min</button>
              <button className="set-toggle-btn active" style={{color: '#059669', backgroundColor: 'white'}}>15 min</button>
              <button className="set-toggle-btn">25 min</button>
            </div>
          </div>

          <div className="toggle-row-spaced" style={{paddingTop: 16, borderTop: '1px solid #e2e8f0'}}>
            <div>
              <span className="box-title">Auto-Escalate to Emergency Services</span>
              <span className="box-desc" style={{fontSize: 11, color: '#475569', marginTop: 4, lineHeight: 1.4}}>
                Automatically notify Municipal Traffic Control and dispatch<br/>units when severity level reaches HIGH.
              </span>
            </div>
            <div className="set-switch active"></div>
          </div>
        </div>

        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>OUTBOUND INTEGRATION HUB</h2>
              <p>Dispatch Webhooks & Municipal APIs</p>
            </div>
            <div style={{width: 32, height: 32, backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #e2e8f0'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 13 5 5z"/><path d="m14 17 5 5z"/><path d="M12 21a9 9 0 0 0 9-9z"/><path d="M3 12a9 9 0 0 0 9 9z"/><path d="M21 12a9 9 0 0 0-9-9z"/><path d="M3 12a9 9 0 0 1 9-9z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="set-col-right">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>DISSEMINATION</h2>
              <p>Delivery Channels</p>
            </div>
            <div style={{width: 32, height: 32, backgroundColor: '#f1f5f9', color: '#3f7d5e', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #e2e8f0'}}>
              <Bell size={16} />
            </div>
          </div>
          <p style={{fontSize: 13, color: '#475569', margin: '-12px 0 0 0', lineHeight: 1.5}}>
            Configured distribution nodes for real-time corridor alerts.
          </p>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16}}>
            <div className="toggle-row-spaced" style={{marginBottom: 8}}>
              <span className="box-title">Push to Field Response Squads</span>
              <div className="set-switch active"></div>
            </div>
            <span className="box-desc" style={{fontSize: 11, color: '#64748b', lineHeight: 1.4}}>
              Instant dispatch push to mobile<br/>responder tablets and roadside<br/>patrols.
            </span>
          </div>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16}}>
            <div className="toggle-row-spaced" style={{marginBottom: 8}}>
              <span className="box-title">SMS Broadcast for Arterial<br/>Closures</span>
              <div className="set-switch"></div>
            </div>
            <span className="box-desc" style={{fontSize: 11, color: '#64748b', lineHeight: 1.4}}>
              Mass cellular warning delivery<br/>for total corridor stoppages.
            </span>
          </div>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16}}>
            <span className="box-title" style={{marginBottom: 8}}>Shift Digest Email Summary</span>
            <span className="box-desc" style={{fontSize: 11, color: '#64748b', lineHeight: 1.4, marginBottom: 12}}>
              Consolidated operational telemetry<br/>briefing for duty chiefs.
            </span>
            <select className="set-select">
              <option>Every 8 Hours (Shift Handover)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAlerts;
