import React from 'react';
import './Sidebar.css';
import { 
  Home, 
  Map, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  BarChart2, 
  Settings, 
  HelpCircle,
  LogOut,
  ShieldAlert,
  Users
} from 'lucide-react';
import { logoutUser } from '../../api/authApi';

const Sidebar = ({ activePage, setActivePage, setIsAuthenticated }) => {
  const navItems = [
    { name: 'Home', icon: Home, dot: true },
    { name: 'Live Traffic', icon: Map, dot: true },
    { name: 'Route Planning', icon: MapPin },
    { name: 'Predictions', icon: TrendingUp },
    { name: 'Incidents', icon: AlertTriangle, badge: '7' },
    { name: 'Nearby', icon: Users, dot: true },
    { name: 'Analytics', icon: BarChart2 },
  ];

  const systemItems = [
    { name: 'Settings', icon: Settings },
    { name: 'Help', icon: HelpCircle, dot: true },
  ];

  return (
    <aside className="sidebar">
      {activePage !== 'Home' && (
        <div className="sidebar-logo">
          <div className="logo-icon-wrapper">
            <ShieldAlert size={20} className="logo-icon" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">TrafficAI</span>
            <span className="subtitle">INTELLIGENCE COMMAND</span>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className={`nav-item ${activePage === item.name ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.name); }}>
                <item.icon className="nav-icon" size={18} />
                <span className="nav-text">{item.name}</span>
                {item.dot && activePage === item.name && <span className="nav-dot"></span>}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-section-title">SYSTEM MANAGEMENT</div>
        <ul style={{marginBottom: 'auto'}}>
          {systemItems.map((item) => (
            <li key={item.name} className={`nav-item ${activePage === item.name ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.name); }}>
                <item.icon className="nav-icon" size={18} />
                <span className="nav-text">{item.name}</span>
                {item.dot && activePage === item.name && <span className="nav-dot"></span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-footer-role">
          <span className="sidebar-footer-label">CURRENT ROLE</span>
          <select className="role-select">
            <option>Analyst</option>
            <option>Dispatcher</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="btn-sign-out" onClick={() => { logoutUser(); setIsAuthenticated(false); }}>
          <LogOut size={14} /> Sign Out
        </button>
        <div className="system-live-status">
          <span className="dot green"></span> SYSTEM LIVE
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
