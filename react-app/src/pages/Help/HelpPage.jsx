import React from 'react';
import './HelpPage.css';
import { Activity, Bell, RotateCcw, Copy, ThumbsUp, ThumbsDown, Plus, ArrowUp } from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="help-page">
      {/* Global Header */}
      <div className="inc-global-header">
        <span className="inc-header-date">FRIDAY, SEP 18 <span style={{color: '#e2e8f0', margin: '0 8px'}}>|</span> 14:35:12 IST</span>
        <div className="inc-header-right">
          <div className="inc-sys-status">
            <span className="inc-dot" style={{backgroundColor: '#059669', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 4}}></span>
            All Systems Active
          </div>
          <button className="inc-icon-btn">
            <Bell size={18} />
            <span className="inc-bell-badge">8</span>
          </button>
          <button className="inc-icon-btn">
            <HeartIcon />
          </button>
          <div className="inc-user-profile">
            <div className="inc-user-text">
              <span className="inc-user-role">Traffic Analyst</span>
              <span className="inc-user-score"><span className="score-badge">SCORE: 100</span> History</span>
            </div>
            <div className="inc-user-avatar">H</div>
          </div>
        </div>
      </div>

      <div className="help-content-container">
        {/* Page Header */}
        <div className="help-header">
          <div>
            <h1>Help & Assistant</h1>
            <p>Ask questions, troubleshoot corridors, or query operational SOPs.</p>
          </div>
          <button className="btn-reset">
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* User Message */}
          <div className="msg-row user">
            <div className="msg-meta">You • 14:32</div>
            <div className="msg-bubble user-bubble">
              How does the Spatio-Temporal Graph ConvNet (ST-GCN) calculate congestion delay on NH-44 when inductive loops drop below 60% reporting?
            </div>
          </div>

          {/* AI Message */}
          <div className="msg-row ai">
            <div className="ai-header">
              <div className="ai-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <span className="ai-name">TrafficAI Copilot</span>
              <span className="ai-dot">•</span>
              <span className="ai-model">ST-GCN Model</span>
            </div>
            
            <div className="msg-bubble ai-bubble">
              <p>When inductive loop reporting on NH-44 drops below the 60% baseline, the system initiates a three-stage fallback matrix to maintain continuous queue monitoring without operational downtime:</p>
              
              <div className="ai-list">
                <div className="ai-list-item">
                  <strong>Adaptive Graph Imputation:</strong> Upstream and downstream node tensors infer flow speeds via adjacency weights <code>(A_ij × W)</code>.
                </div>
                <div className="ai-list-item">
                  <strong>Optical Flow Fusion:</strong> Corridor CCTV cameras (Sector 14 to KM 28) run edge YOLO-v8 models to cross-validate density at 15 FPS.
                </div>
                <div className="ai-list-item">
                  <strong>Confidence Calibration:</strong> Metric confidence adjusts to 88.4%, and an advisory flag is routed to the Corridor Coordinator.
                </div>
              </div>

              <div className="ai-code-block">
                <div className="code-header">FALLBACK RESPONSE TELEMETRY</div>
                <div className="code-content">
                  corridor: "NH44-SEC14-KM28"  |  loop_ratio: 0.54  |  speed: 41.8 km/h  |  confidence: 0.88
                </div>
              </div>

              <div className="ai-actions">
                <button className="ai-action-btn"><Copy size={14} /> Copy</button>
                <button className="ai-action-btn"><ThumbsUp size={14} /></button>
                <button className="ai-action-btn"><ThumbsDown size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area Fixed at Bottom */}
        <div className="chat-input-area">
          <div className="suggestions-row">
            <span className="suggestions-label">SUGGESTIONS:</span>
            <button className="suggestion-pill">Congestion algorithms</button>
            <button className="suggestion-pill">Sensor calibration</button>
            <button className="suggestion-pill">Escalation protocol</button>
            <button className="suggestion-pill">Police CAD webhooks</button>
          </div>

          <div className="input-box-wrapper">
            <button className="input-plus-btn">
              <Plus size={20} />
            </button>
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask TrafficAI anything about traffic models, protocols, or sensors..." 
            />
            <button className="input-send-btn">
              <ArrowUp size={18} />
            </button>
          </div>

          <div className="input-footer">
            TrafficAI Assistant references live telemetry, ST-GCN nodes, and standard operating protocols.
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Heart Icon component
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default HelpPage;
