import React from 'react';
import { Shield } from 'lucide-react';

const TabAccess = () => {
  return (
    <div className="set-tab-content">
      {/* Left Column */}
      <div className="set-col-left">
        <div className="set-card">
          <div className="set-card-header" style={{alignItems: 'center'}}>
            <div className="set-card-title">
              <h2 style={{color: '#64748b'}}>GOVERNANCE & AUTHORIZATION</h2>
              <p>Active Operators & Access Control</p>
            </div>
            <button className="btn-save" style={{backgroundColor: '#e0f2fe', color: '#0369a1', height: 32, fontSize: 12}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              + Invite Operator
            </button>
          </div>

          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: 8}}>
            <thead>
              <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                <th style={{padding: '0 0 12px 0', fontSize: 11, fontWeight: 700, color: '#64748b'}}>OPERATOR / ENTITY</th>
                <th style={{padding: '0 0 12px 0', fontSize: 11, fontWeight: 700, color: '#64748b'}}>ASSIGNED ROLE</th>
                <th style={{padding: '0 0 12px 0', fontSize: 11, fontWeight: 700, color: '#64748b'}}>SCOPE &<br/>CLEARANCE</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '16px 0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 36, height: 36, backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 600, fontSize: 12}}>HV</div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Harsh Vardhan <span style={{backgroundColor: '#ecfdf5', color: '#059669', fontSize: 9, padding: '2px 6px', borderRadius: 4, marginLeft: 4}}>You</span></div>
                      <div style={{fontSize: 11, color: '#94a3b8'}}>h.vardhan@trafficai.gov.in</div>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Senior Traffic Analyst</div>
                  <div style={{fontSize: 11, color: '#0ea5e9'}}>Tier 1 Command</div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{backgroundColor: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4}}>
                    <span className="dot" style={{backgroundColor: '#3b82f6', width: 4, height: 4}}></span> Full<br/>Region Control
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '16px 0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 36, height: 36, backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 600, fontSize: 12}}>PS</div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Priya Sharma</div>
                      <div style={{fontSize: 11, color: '#94a3b8'}}>p.sharma@trafficai.gov.in</div>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Corridor Dispatcher</div>
                  <div style={{fontSize: 11, color: '#0ea5e9'}}>Tier 2 Dispatch</div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{backgroundColor: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4}}>
                    <span className="dot" style={{backgroundColor: '#8b5cf6', width: 4, height: 4}}></span> Zone 1<br/>Arterial Only
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '16px 0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 36, height: 36, backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 600, fontSize: 12}}>RK</div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Rajesh Kumar</div>
                      <div style={{fontSize: 11, color: '#94a3b8'}}>r.kumar@trafficai.gov.in</div>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Edge Infrastructure Engineer</div>
                  <div style={{fontSize: 11, color: '#64748b'}}>Hardware Subsystem</div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{backgroundColor: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4}}>
                    <span className="dot" style={{backgroundColor: '#f59e0b', width: 4, height: 4}}></span> Sensors &<br/>Fleet Calibration
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td style={{padding: '16px 0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 36, height: 36, backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                      <Shield size={16} />
                    </div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Municipal Police Liaison <span style={{backgroundColor: '#f1f5f9', color: '#64748b', fontSize: 9, padding: '2px 6px', borderRadius: 4, marginLeft: 4}}>API</span></div>
                      <div style={{fontSize: 11, color: '#94a3b8'}}>app-gateway@delhipolice.nic.in</div>
                    </div>
                  </div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>External Integration</div>
                  <div style={{fontSize: 11, color: '#64748b'}}>Service Account</div>
                </td>
                <td style={{padding: '16px 0'}}>
                  <div style={{backgroundColor: '#ecfdf5', color: '#059669', fontSize: 11, padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4, border: '1px solid #a7f3d0'}}>
                    <span className="dot" style={{backgroundColor: '#059669', width: 4, height: 4}}></span> Incidents<br/>Read-Only
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="set-card">
          <div className="set-card-header" style={{alignItems: 'center'}}>
            <div className="set-card-title">
              <h2 style={{color: '#64748b'}}>TAMPER-PROOF AUDIT TRAIL</h2>
              <p>System Audit Log & Configuration History</p>
            </div>
            <button className="btn-export">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Audit Log (.CSV)
            </button>
          </div>

          <div style={{marginTop: 8, paddingLeft: 8, borderLeft: '2px solid #e2e8f0', position: 'relative'}}>
            {/* Log item 1 */}
            <div style={{position: 'absolute', top: 4, left: -5, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3f7d5e'}}></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <span style={{fontSize: 11, fontWeight: 700, color: '#475569'}}>14:15 IST</span>
                <span style={{fontSize: 12, fontWeight: 800, color: '#1e293b'}}>CONFIG UPDATE</span>
                <span style={{fontSize: 12, color: '#64748b'}}>• H. Vardhan</span>
              </div>
              <span style={{fontSize: 10, color: '#94a3b8', fontFamily: 'monospace'}}>HASH: 9e4f71a0c</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="set-col-right">
        <div className="set-card">
          <div className="set-card-header">
            <div className="set-card-title">
              <h2 style={{color: '#64748b', letterSpacing: 1}}>ZERO-TRUST ENVIRONMENT</h2>
              <p>Security & Session Policies</p>
            </div>
          </div>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div style={{display: 'flex', gap: 12}}>
                <div style={{color: '#3f7d5e', marginTop: 2}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <div style={{fontSize: 13, fontWeight: 700, color: '#1e293b'}}>Two-Factor<br/>Authentication</div>
                  <div style={{fontSize: 11, color: '#64748b'}}>Hardware<br/>FIDO2 / TOTP</div>
                </div>
              </div>
              <div className="set-badge" style={{color: '#3f7d5e', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0'}}>
                <span className="dot" style={{backgroundColor: '#3f7d5e'}}></span> Enforced
              </div>
            </div>
            
            <p style={{fontSize: 12, color: '#475569', marginTop: 16, lineHeight: 1.5}}>
              Enforced for all Command Personnel and dispatch terminals without exception.
            </p>
          </div>

          <div style={{marginTop: 8}}>
            <label className="set-label">Session Inactivity Timeout</label>
            <select className="set-select" style={{marginBottom: 8}}>
              <option>30 minutes (Command Standard)</option>
            </select>
            <p style={{fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: 0}}>
              Terminals will lock automatically and require biometric/passcode re-auth.
            </p>
          </div>

          <div style={{marginTop: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
              <label className="set-label" style={{margin: 0}}>IP Allowlisting &<br/>Bastion CIDR</label>
              <button className="btn-link">+ Add<br/>Range</button>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 12}}>
                <div>
                  <div style={{fontSize: 12, fontWeight: 800, color: '#1e293b'}}>10.128.0.0/16</div>
                  <div style={{fontSize: 11, color: '#64748b'}}>Govt Intranet Subnet</div>
                </div>
                <div style={{color: '#10b981'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontSize: 12, fontWeight: 800, color: '#1e293b'}}>192.168.1.0/24</div>
                  <div style={{fontSize: 11, color: '#64748b'}}>HQ Control Room Dispatch</div>
                </div>
                <div style={{color: '#10b981'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAccess;
