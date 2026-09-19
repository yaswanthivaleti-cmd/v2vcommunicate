import React, { useState } from 'react';
import './AlertActionModal.css';

const ALERT_OPTIONS = [
  "Accident",
  "Breakdown",
  "Hazard",
  "Heavy Traffic",
  "Medical Emergency",
  "Other"
];

const AlertActionModal = ({ isOpen, onClose, onSend, targetName, isBroadcast }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [customText, setCustomText] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (!selectedOption) return;
    
    // Only send custom text if 'Other' is selected and text exists
    const textToSend = (selectedOption === "Other" && customText.trim()) 
      ? customText.trim() 
      : null;
      
    // Send event type and custom text
    onSend(selectedOption, textToSend);
    
    // Reset state and close
    setSelectedOption("");
    setCustomText("");
    onClose();
  };

  return (
    <div className="alert-action-overlay">
      <div className="alert-action-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>{isBroadcast ? "Broadcast Emergency" : `Send Alert to ${targetName}`}</h2>
        <p className="subtitle">
          {isBroadcast 
            ? "This alert will be sent to ALL vehicles within a 500m radius."
            : "Select an alert type to notify this specific vehicle."}
        </p>

        <div className="options-grid">
          {ALERT_OPTIONS.map(opt => (
            <button 
              key={opt}
              className={`option-btn ${selectedOption === opt ? 'selected' : ''}`}
              onClick={() => setSelectedOption(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {selectedOption === "Other" && (
          <div className="custom-text-container">
            <input 
              type="text" 
              placeholder="Describe the situation..." 
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={100}
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className={`send-btn ${!selectedOption || (selectedOption === 'Other' && !customText.trim()) ? 'disabled' : ''}`} 
            onClick={handleSend}
            disabled={!selectedOption || (selectedOption === 'Other' && !customText.trim())}
          >
            {isBroadcast ? "Broadcast Now" : "Send Alert"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertActionModal;
