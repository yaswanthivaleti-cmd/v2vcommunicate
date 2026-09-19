import React from 'react';
import { Settings, Cpu, Wifi, Bell, Shield, Download, Check } from 'lucide-react';
import TabGeneral from './TabGeneral';
import TabAIEngine from './TabAIEngine';
import TabAlerts from './TabAlerts';
import TabAccess from './TabAccess';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('General');

  return (
    <div className="settings-page">
      {/* Global Header (Simplified version for consistency) */}
      <div className="inc-global-header">
        <span className="inc-header-date">FRIDAY, SEP 18 <span style={{color: '#e2e8f0', margin: '0 8px'}}>|</span> 14:35:12 IST</span>
        <div className="inc-header-right">
          <div className="inc-sys-status">
            <span className="inc-dot" style={{backgroundColor: '#059669', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 4}}></span>
            All Systems Active
          </div>
          <button className="inc-icon-btn" onClick={() => window.dispatchEvent(new CustomEvent('toggleNotifications'))}>
            <Bell size={18} />
            <span className="inc-bell-badge">8</span>
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

      <div className="set-page-content">
        <div className="set-breadcrumb">
          NCR-ZONE-1 / SYSTEM CONFIG <span className="green-dot">•</span> v4.2.0-prod
        </div>

        <div className="set-header-row">
          <div className="set-title-group">
            <h1>Settings</h1>
            <p>Manage telemetry ingestion, machine learning inference windows, and dispatch webhooks across NCR corridor networks.</p>
          </div>
          <div className="set-actions">
            <button className="btn-export">
              <Download size={14} /> Export JSON
            </button>
            <button className="btn-save">
              <Check size={14} /> Save Changes
            </button>
          </div>
        </div>

        <div className="set-tabs-row">
          <button className={`set-tab ${activeTab === 'General' ? 'active' : ''}`} onClick={() => setActiveTab('General')}>
            General & Region
          </button>
          <button className={`set-tab ${activeTab === 'AI' ? 'active' : ''}`} onClick={() => setActiveTab('AI')}>
            <Cpu size={14} /> AI Engine
          </button>
          <button className={`set-tab ${activeTab === 'IoT' ? 'active' : ''}`} onClick={() => setActiveTab('IoT')}>
            IoT Grid
          </button>
          <button className={`set-tab ${activeTab === 'Alerts' ? 'active' : ''}`} onClick={() => setActiveTab('Alerts')}>
            Alerts & Routing
          </button>
          <button className={`set-tab ${activeTab === 'Access' ? 'active' : ''}`} onClick={() => setActiveTab('Access')}>
            <Shield size={14} /> Access & Audit
          </button>
        </div>

        <div className="set-tab-content-wrapper">
          {activeTab === 'General' && <TabGeneral />}
          {activeTab === 'AI' && <TabAIEngine />}
          {activeTab === 'Alerts' && <TabAlerts />}
          {activeTab === 'Access' && <TabAccess />}
          {activeTab === 'IoT' && <div>IoT Grid Settings Placeholder</div>}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
