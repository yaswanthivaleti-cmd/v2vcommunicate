import React from 'react';
import './EmergencyAlertToast.css';
import { ShieldAlert } from 'lucide-react';

const EmergencyAlertToast = ({ alertData, onOpenChat, onDismiss }) => {
  if (!alertData) return null;

  return (
    <div className="emergency-toast-container">
      <div className="et-icon-col">
        <ShieldAlert size={28} color="#ef4444" />
      </div>
      <div className="et-content-col">
        <div className="et-title">🚨 {alertData.type.replace(/_/g, ' ').toUpperCase()}</div>
        <div className="et-message">{alertData.message}</div>
        {alertData.custom_text && (
          <div className="et-custom-text">"{alertData.custom_text}"</div>
        )}
        <div className="et-distance">Distance: ~{alertData.distance_meters} m</div>
        
        <div className="et-actions">
          <button className="et-btn-chat" onClick={() => onOpenChat(alertData)}>Open Chat</button>
          <button className="et-btn-dismiss" onClick={onDismiss}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertToast;
