import React from 'react';
import './GlobalLoader.css';
import { Activity } from 'lucide-react';

const GlobalLoader = ({ message = "Loading..." }) => {
  return (
    <div className="global-loader-container">
      <div className="loader-radar"></div>
      <span className="loader-text">{message}</span>
    </div>
  );
};

export default GlobalLoader;
