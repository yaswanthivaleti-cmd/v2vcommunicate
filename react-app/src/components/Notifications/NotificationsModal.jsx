import React, { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import './NotificationsModal.css';

const mockNotifications = [
  { id: 1, type: 'critical', title: 'Severe Congestion: NH-44 Sector 14', time: '2 mins ago', read: false },
  { id: 2, type: 'warning', title: 'Route Recalculated due to accident', time: '15 mins ago', read: false },
  { id: 3, type: 'info', title: 'V2V Network Health Check Passed', time: '1 hour ago', read: true },
  { id: 4, type: 'critical', title: 'Emergency Vehicle Approaching from behind', time: '2 hours ago', read: true },
  { id: 5, type: 'info', title: 'Daily Analytics Report Ready', time: '6 hours ago', read: true }
];

const NotificationsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleNotifications', handleToggle);
    return () => window.removeEventListener('toggleNotifications', handleToggle);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (!isOpen) return null;

  return (
    <div className="notifications-overlay" onClick={() => setIsOpen(false)}>
      <div className="notifications-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-header">
          <div className="notifications-title">
            <Bell size={20} />
            <h2>Notifications</h2>
            <span className="notifications-count">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>
          <button className="close-notifications" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="notifications-actions">
          <button onClick={markAllAsRead} className="mark-read-btn">Mark all as read</button>
        </div>

        <div className="notifications-body">
          {notifications.map(notif => (
            <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
              <div className={`notification-icon-wrapper ${notif.type}`}>
                {notif.type === 'critical' ? <ShieldAlert size={18} /> : 
                 notif.type === 'warning' ? <AlertTriangle size={18} /> : 
                 <Info size={18} />}
              </div>
              <div className="notification-content">
                <p className="notification-title">{notif.title}</p>
                <p className="notification-time">{notif.time}</p>
              </div>
              {!notif.read && <div className="unread-dot"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
