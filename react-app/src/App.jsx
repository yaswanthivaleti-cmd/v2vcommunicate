import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/Home/HomePage';
import LiveTrafficPage from './pages/LiveTraffic/LiveTrafficPage';
import RoutePlanningPage from './pages/RoutePlanning/RoutePlanningPage';
import PredictionsPage from './pages/Predictions/PredictionsPage';
import IncidentsPage from './pages/Incidents/IncidentsPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import HelpPage from './pages/Help/HelpPage';
import EmergencyAlertToast from './components/Emergency/EmergencyAlertToast';
import EmergencyChatModal from './components/Emergency/EmergencyChatModal';
import './App.css';

// Simple UUID generator for the hackathon
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function App() {
  const [activePage, setActivePage] = useState('Help');
  
  // Emergency Chat State
  const [vehicleUuid, setVehicleUuid] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Initialize UUID
  useEffect(() => {
    let storedUuid = localStorage.getItem('trafficai_vehicle_uuid');
    if (!storedUuid) {
      storedUuid = generateUUID();
      localStorage.setItem('trafficai_vehicle_uuid', storedUuid);
    }
    setVehicleUuid(storedUuid);
  }, []);

  // Poll for Emergency Alerts (Hackathon approach)
  useEffect(() => {
    if (!vehicleUuid) return;
    
    const pollAlerts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
        const response = await fetch(`${API_BASE}/emergency/alerts/${vehicleUuid}`);
        if (response.ok) {
          const alerts = await response.json();
          if (alerts.length > 0) {
            // Just show the first active alert
            if (!activeAlert || activeAlert.alert_id !== alerts[0].alert_id) {
              setActiveAlert(alerts[0]);
            }
          } else {
            setActiveAlert(null);
          }
        }
      } catch (err) {
        console.error("Polling alerts failed", err);
      }
    };
    
    const intervalId = setInterval(pollAlerts, 3000);
    return () => clearInterval(intervalId);
  }, [vehicleUuid, activeAlert]);

  const handleOpenChat = async (alert) => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
      const response = await fetch(`${API_BASE}/emergency/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: alert.event_id,
          vehicle_uuid: vehicleUuid,
          role: "affected_vehicle"
        })
      });
      if (response.ok) {
        const data = await response.json();
        setActiveSessionId(data.session_id);
        setShowChatModal(true);
        setActiveAlert(null);
      }
    } catch (err) {
      console.error("Failed to open chat", err);
    }
  };

  return (
    <div className="app-container">
      {activePage === 'Home' && <Header />}
      <div className="main-content">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="page-content">
          {activePage === 'Home' && <HomePage setActivePage={setActivePage} />}
          {activePage === 'Live Traffic' && <LiveTrafficPage setActivePage={setActivePage} />}
          {activePage === 'Route Planning' && <RoutePlanningPage setActivePage={setActivePage} />}
          {activePage === 'Predictions' && <PredictionsPage setActivePage={setActivePage} />}
          {activePage === 'Incidents' && <IncidentsPage setActivePage={setActivePage} />}
          {activePage === 'Analytics' && <AnalyticsPage setActivePage={setActivePage} />}
          {activePage === 'Settings' && <SettingsPage setActivePage={setActivePage} />}
          {activePage === 'Help' && <HelpPage setActivePage={setActivePage} />}
        </main>
      </div>

      {/* Emergency Overlays */}
      {activeAlert && !showChatModal && (
        <EmergencyAlertToast 
          alertData={activeAlert} 
          onOpenChat={handleOpenChat} 
          onDismiss={() => setActiveAlert(null)} 
        />
      )}
      
      {showChatModal && activeSessionId && (
        <EmergencyChatModal 
          sessionId={activeSessionId}
          eventId={activeSessionId}
          vehicleUuid={vehicleUuid}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  );
}

export default App;
