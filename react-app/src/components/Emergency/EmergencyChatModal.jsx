import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import './EmergencyChatModal.css';

const QUICK_RESPONSES = [
  "I'm safe",
  "Need help",
  "Hazard still active",
  "I'm moving",
  "Are you safe?",
  "Slowing down"
];

const EmergencyChatModal = ({ sessionId, eventId, vehicleUuid, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 1. Fetch initial session & messages via REST
    const fetchSession = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
        const response = await fetch(`${API_BASE}/emergency/sessions/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
          if (data.session.status !== 'active') {
            setIsReadOnly(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      }
    };
    fetchSession();

    // 2. Connect WebSocket
    const wsUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1")
                  .replace('http', 'ws') + `/emergency/ws/${sessionId}/${vehicleUuid}`;
    
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      setIsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'system' && data.message.includes('ended')) {
        setIsReadOnly(true);
      }
      setMessages((prev) => [...prev, data]);
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [sessionId, vehicleUuid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim() || !isConnected || isReadOnly) return;
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: text }));
      setInputValue('');
    }
  };

  return (
    <div className="emergency-chat-overlay">
      <div className="emergency-chat-modal">
        
        {/* Header */}
        <div className="ec-header">
          <div className="ec-title">
            <ShieldAlert size={20} color="#ef4444" />
            <span>Emergency Communication</span>
          </div>
          <button className="ec-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Info Banner */}
        <div className="ec-banner">
          <div className="ec-event-type">Event: Vehicle stopped ahead</div>
          <div className="ec-status">
            {isReadOnly ? "Session Ended (Read-Only)" : (isConnected ? "Live Chat Active" : "Connecting...")}
          </div>
        </div>

        {/* Messages */}
        <div className="ec-messages-container">
          {messages.map((msg, idx) => {
            if (msg.type === 'system') {
              return (
                <div key={idx} className="ec-message system">
                  {msg.message}
                </div>
              );
            }
            
            const isMe = msg.sender_vehicle_uuid === vehicleUuid;
            return (
              <div key={idx} className={`ec-message-row ${isMe ? 'me' : 'them'}`}>
                {!isMe && <span className="ec-sender-role">Connected Vehicle</span>}
                <div className={`ec-bubble ${isMe ? 'me' : 'them'}`}>
                  {msg.message}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        {!isReadOnly && (
          <div className="ec-quick-responses">
            {QUICK_RESPONSES.map(resp => (
              <button key={resp} className="ec-quick-btn" onClick={() => sendMessage(resp)}>
                {resp}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        {!isReadOnly && (
          <div className="ec-input-area">
            <input 
              type="text" 
              className="ec-input" 
              placeholder="Type a message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
            />
            <button className="ec-send-btn" onClick={() => sendMessage(inputValue)}>
              <Send size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmergencyChatModal;
