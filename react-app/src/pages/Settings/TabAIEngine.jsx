import React from 'react';
import { Settings } from 'lucide-react';

const TabAIEngine = () => {
  return (
    <div className="set-tab-content">
      {/* Left Column */}
      <div className="set-col-left">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2>INFERENCE CORE</h2>
              <p>Neural Architecture & Active Weights</p>
            </div>
            <div className="set-badge" style={{color: '#6366f1', backgroundColor: '#e0e7ff', borderColor: '#c7d2fe'}}>
              <span className="dot" style={{backgroundColor: '#6366f1'}}></span> ACTIVE RUNTIME
            </div>
          </div>

          <div className="model-active-box" style={{flexDirection: 'column', alignItems: 'stretch', gap: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div className="model-info">
                <span className="model-name">NeuralFlow-v4.2 <span className="badge active" style={{backgroundColor: '#3b82f6', color: 'white', border: 'none'}}>PRIMARY MODEL</span></span>
                <span className="model-desc">Spatio-Temporal Graph Convolutional Network<br/>(ST-GCN) + Extended Kalman Filter</span>
              </div>
              <div className="set-badge" style={{color: '#3b82f6', backgroundColor: 'transparent', borderColor: 'transparent', fontSize: 11}}>
                <span className="dot" style={{backgroundColor: '#3b82f6'}}></span> ONLINE
              </div>
            </div>

            <div style={{display: 'flex', gap: 12}}>
              <div style={{flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 6, border: '1px solid #e2e8f0'}}>
                <div style={{fontSize: 11, color: '#64748b', marginBottom: 4}}>Validation<br/>Accuracy</div>
                <div style={{fontSize: 14, fontWeight: 700, color: '#1e293b'}}>94.6 %</div>
                <div style={{height: 3, backgroundColor: '#f1f5f9', marginTop: 8, borderRadius: 2}}>
                  <div style={{height: '100%', width: '94.6%', backgroundColor: '#10b981', borderRadius: 2}}></div>
                </div>
              </div>
              <div style={{flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 6, border: '1px solid #e2e8f0'}}>
                <div style={{fontSize: 11, color: '#64748b', marginBottom: 4}}>Inference<br/>Latency</div>
                <div style={{fontSize: 14, fontWeight: 700, color: '#1e293b'}}>18 ms</div>
                <div style={{height: 3, backgroundColor: '#f1f5f9', marginTop: 8, borderRadius: 2}}>
                  <div style={{height: '100%', width: '30%', backgroundColor: '#3b82f6', borderRadius: 2}}></div>
                </div>
              </div>
              <div style={{flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 6, border: '1px solid #e2e8f0'}}>
                <div style={{fontSize: 11, color: '#64748b', marginBottom: 4}}>Topology Nodes<br/></div>
                <div style={{fontSize: 14, fontWeight: 700, color: '#1e293b'}}>1,420 <span style={{fontSize: 11, color: '#64748b', fontWeight: 500}}>vertices</span></div>
                <div style={{height: 3, backgroundColor: '#f1f5f9', marginTop: 8, borderRadius: 2}}>
                  <div style={{height: '100%', width: '75%', backgroundColor: '#059669', borderRadius: 2}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="model-active-box" style={{backgroundColor: '#f8fafc', alignItems: 'flex-start'}}>
            <div style={{display: 'flex', gap: 12}}>
              <div style={{width: 32, height: 32, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              </div>
              <div className="model-info">
                <span className="model-name">IsolationForest-v2.1 <span className="badge" style={{backgroundColor: '#e2e8f0', color: '#475569', fontSize: 9, padding: '2px 6px', borderRadius: 4}}>SECONDARY<br/>COPROCESSOR</span></span>
                <span className="model-desc" style={{marginTop: 4, lineHeight: 1.4}}>Autonomous real-time edge<br/>anomaly & incident boundary<br/>detection</span>
              </div>
            </div>
            <div style={{backgroundColor: 'white', padding: '6px 12px', borderRadius: 16, fontSize: 11, fontWeight: 700, color: '#3b82f6', border: '1px solid #bfdbfe'}}>
              99.1% Confidence
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-color)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 32, height: 32, backgroundColor: '#f8fafc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
              </div>
              <div>
                <div style={{fontSize: 12, fontWeight: 700, color: '#1e293b'}}>checkpoint_epoch_142.pt</div>
                <div style={{fontSize: 9, color: '#94a3b8', fontFamily: 'monospace'}}>SHA-256: 7e4b9c1d0fa4...981c</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{fontSize: 11, color: '#64748b', textAlign: 'right'}}>
                Synced<br/>2h ago
              </div>
              <button className="btn-link" style={{display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#f8fafc', padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', color: '#475569'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                Inspect Layer Weights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="set-col-right">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2 style={{color: '#3f7d5e'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4}}><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg> CONTINUOUS LEARNING</h2>
            </div>
          </div>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 4}}>Retraining & Calibration</div>
            <div style={{fontSize: 11, color: '#64748b', lineHeight: 1.4}}>Automated online fine-tuning and safety fallback triggers.</div>
          </div>

          <div>
            <label className="set-label">Automated Retraining Schedule</label>
            <select className="set-select" style={{marginBottom: 8}}>
              <option>Daily at 02:00 IST (Off-Peak Window)</option>
            </select>
            <div style={{fontSize: 11, color: '#3f7d5e', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Next calibration scheduled in 11h 24m
            </div>
          </div>

          <div style={{marginTop: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16}}>
              <label className="set-label" style={{margin: 0}}>Drift Detection<br/>Threshold</label>
              <div style={{backgroundColor: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 800, textAlign: 'center'}}>
                6.0% MSE<br/>variance
              </div>
            </div>
            
            <div style={{position: 'relative', height: 40, marginBottom: 16}}>
              <div style={{position: 'absolute', top: 8, left: 0, right: 0, height: 4, backgroundColor: '#e2e8f0', borderRadius: 2}}>
                <div style={{position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', backgroundColor: '#3f7d5e', borderRadius: 2}}></div>
              </div>
              <div style={{position: 'absolute', top: 4, left: '40%', width: 12, height: 12, backgroundColor: '#3f7d5e', borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}></div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', position: 'absolute', top: 20, left: 0, right: 0}}>
                <div style={{textAlign: 'center'}}><div style={{fontSize: 11, fontWeight: 700}}>1.0%</div><div style={{fontSize: 9, color: '#64748b'}}>(Strict)</div></div>
                <div style={{textAlign: 'center'}}><div style={{fontSize: 11, fontWeight: 700}}>6.0%</div><div style={{fontSize: 9, color: '#64748b'}}>(Nominal)</div></div>
                <div style={{textAlign: 'center'}}><div style={{fontSize: 11, fontWeight: 700}}>15.0%</div><div style={{fontSize: 9, color: '#64748b'}}>(Permissive)</div></div>
              </div>
            </div>
            
            <div style={{fontSize: 10, color: '#94a3b8', lineHeight: 1.4}}>
              Triggers background shadow validation if mean squared error deviates past threshold against ground sensors.
            </div>
          </div>

          <div className="toggle-row-box" style={{height: 'auto', padding: '12px 16px', backgroundColor: '#f8fafc', marginTop: 8}}>
            <div>
              <span className="box-title" style={{display: 'flex', alignItems: 'center', gap: 6}}>Auto-Fallback on Drift <span style={{backgroundColor: '#1e293b', color: 'white', fontSize: 8, padding: '2px 4px', borderRadius: 2}}>SAFETY</span></span>
              <span className="box-desc" style={{marginTop: 4, lineHeight: 1.3}}>Revert to baseline heuristics if inference<br/>error exceeds threshold for 3 consecutive<br/>intervals.</span>
            </div>
            <div className="set-switch active"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAIEngine;
