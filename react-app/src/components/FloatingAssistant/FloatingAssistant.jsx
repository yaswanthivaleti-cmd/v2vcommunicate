import React, { useState, useEffect, useRef } from 'react';
import './FloatingAssistant.css';
import { Bot, X, MessageSquare, ChevronRight } from 'lucide-react';

const hardcodedOptions = [
  {
    question: "How do I report an incident?",
    answer: "You can report an incident automatically using your vehicle's telemetry, or manually by going to the Nearby page and clicking 'Broadcast Emergency'."
  },
  {
    question: "What does 'Route Planning' do?",
    answer: "Route Planning compares multiple paths to your destination, showing live traffic conditions, predicted delays, and eco-friendly scores to help you choose the best route."
  },
  {
    question: "How does V2V communication work?",
    answer: "Vehicle-to-Vehicle (V2V) communication allows your app to exchange real-time speed and hazard alerts directly with other nearby drivers within a 500m radius."
  }
];

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: 'Hi! I am your AI Co-Pilot. How can I help you today?' }
  ]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleOptionClick = (option) => {
    setChatHistory([
      ...chatHistory,
      { role: 'user', text: option.question },
      { role: 'assistant', text: option.answer }
    ]);
  };

  const handleReset = () => {
    setChatHistory([
      { role: 'assistant', text: 'Hi! I am your AI Co-Pilot. How can I help you today?' }
    ]);
  };

  return (
    <div className="floating-assistant-wrapper">
      {isOpen && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <div className="assistant-title">
              <Bot size={18} />
              <span>Traffic AI Assistant</span>
            </div>
            <button className="close-assistant-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>
          
          <div className="assistant-chat-body" ref={chatBodyRef}>
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="assistant-options-container">
            {chatHistory.length === 1 ? (
              <div className="options-list">
                {hardcodedOptions.map((opt, idx) => (
                  <button key={idx} className="option-btn" onClick={() => handleOptionClick(opt)}>
                    <span>{opt.question}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            ) : (
              <button className="reset-chat-btn" onClick={handleReset}>
                <MessageSquare size={14} /> Ask another question
              </button>
            )}
          </div>
        </div>
      )}

      <button className={`assistant-fab ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
};

export default FloatingAssistant;
