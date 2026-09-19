import React from 'react';
import './SearchCard.css';
import { MapPin, Search, ArrowRightLeft, Home, Briefcase, Star, Clock, ChevronDown } from 'lucide-react';

const SearchCard = ({ setActivePage }) => {
  return (
    <div className="search-card">
      <div className="search-inputs-row">
        <div className="input-group location-input">
          <div className="input-icon-wrapper location-dot">
            <span className="dot green"></span>
          </div>
          <div className="input-text">
            <span className="input-label">YOUR LOCATION</span>
            <input type="text" defaultValue="Phagwara, Punjab" />
          </div>
        </div>
        
        <button className="swap-btn">
          <ArrowRightLeft size={16} />
        </button>

        <div className="input-group destination-input">
          <div className="input-icon-wrapper">
            <MapPin size={16} className="text-muted" />
          </div>
          <div className="input-text">
            <span className="input-label">WHERE ARE YOU GOING?</span>
            <input type="text" placeholder="Search for a place or landmark" />
          </div>
        </div>
        
        <button className="search-submit-btn" onClick={() => setActivePage && setActivePage('Route Planning')}>
          <Search size={20} />
        </button>
      </div>

      <div className="quick-filters">
        <button className="filter-pill"><Home size={14} /> Home</button>
        <button className="filter-pill"><Briefcase size={14} /> Work</button>
        <button className="filter-pill"><Star size={14} className="star-icon" /> LPU</button>
        <button className="filter-pill"><Clock size={14} /> Recent <ChevronDown size={14} /></button>
      </div>
    </div>
  );
};

export default SearchCard;
