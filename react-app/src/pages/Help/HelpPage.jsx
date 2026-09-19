import React, { useState } from 'react';
import './HelpPage.css';
import { Search, ChevronDown, ChevronUp, Bell, Heart, Activity, Car, Map, ShieldAlert, Settings, BookOpen } from 'lucide-react';

const faqCategories = [
  {
    title: 'Getting Started',
    icon: <BookOpen size={20} />,
    questions: [
      {
        q: 'What is TrafficAI?',
        a: 'TrafficAI is an intelligent command center that uses real-time telemetry, routing algorithms, and V2V (Vehicle-to-Vehicle) communication to optimize your travel.'
      },
      {
        q: 'How do I enable V2V communication?',
        a: 'V2V communication is enabled automatically as long as you have granted location permissions. You can see nearby connected vehicles on the "Nearby" page.'
      }
    ]
  },
  {
    title: 'Route & Navigation',
    icon: <Map size={20} />,
    questions: [
      {
        q: 'How does Route Planning work?',
        a: 'Route Planning analyzes live traffic, historical congestion patterns (using ST-GCN models), and active incidents to provide multiple route options optimized for time or eco-friendliness.'
      },
      {
        q: 'What does the Eco Score mean?',
        a: 'The Eco Score calculates the estimated fuel efficiency and carbon footprint of a route based on elevation changes, average speeds, and expected idling time in traffic.'
      }
    ]
  },
  {
    title: 'Incidents & Alerts',
    icon: <ShieldAlert size={20} />,
    questions: [
      {
        q: 'How do I report an incident?',
        a: 'You can report incidents manually via the "Nearby" page by clicking "Broadcast Emergency". Alternatively, severe sudden decelerations are automatically flagged as anomalies.'
      },
      {
        q: 'What is the difference between Active and Resolved incidents?',
        a: 'Active incidents are currently impacting traffic and are verified by multiple nodes. Resolved incidents have been cleared, but remain in the log for historical analytics.'
      }
    ]
  },
  {
    title: 'V2V Features',
    icon: <Car size={20} />,
    questions: [
      {
        q: 'Can I message other drivers?',
        a: 'Direct messaging is restricted for privacy. However, during an active emergency event, affected vehicles are joined into an anonymous, temporary chat session to coordinate.'
      },
      {
        q: 'How far does the radar reach?',
        a: 'The Nearby page displays vehicles within a 500-meter radius of your current GPS location.'
      }
    ]
  },
  {
    title: 'Account & Settings',
    icon: <Settings size={20} />,
    questions: [
      {
        q: 'How do I change my vehicle profile?',
        a: 'Navigate to the Settings tab to update your vehicle type, weight class (which affects routing), and notification preferences.'
      },
      {
        q: 'Is my location data secure?',
        a: 'Yes. Location data is anonymized. Your exact coordinates are only shared temporarily with nearby nodes when you actively trigger an emergency broadcast.'
      }
    ]
  }
];

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

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

      <div className="help-content-container">
        {/* Page Header */}
        <div className="help-header">
          <div>
            <h1>Help Center</h1>
            <p>Find answers to common questions and learn how to use TrafficAI.</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="help-search-container">
          <div className="help-search-box">
            <Search size={20} className="help-search-icon" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Area */}
        <div className="faq-area">
          {filteredCategories.length === 0 ? (
            <div className="no-results">No results found for "{searchQuery}"</div>
          ) : (
            filteredCategories.map((category, catIdx) => (
              <div key={catIdx} className="faq-category">
                <div className="faq-category-header">
                  <div className="faq-category-icon">{category.icon}</div>
                  <h2>{category.title}</h2>
                </div>
                
                <div className="faq-list">
                  {category.questions.map((item, qIdx) => {
                    const uniqueIndex = `${catIdx}-${qIdx}`;
                    const isOpen = openIndex === uniqueIndex;
                    
                    return (
                      <div key={qIdx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button className="faq-question" onClick={() => toggleAccordion(uniqueIndex)}>
                          <span>{item.q}</span>
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        {isOpen && (
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
