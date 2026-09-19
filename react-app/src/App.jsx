import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/Home/HomePage';
import LiveTrafficPage from './pages/LiveTraffic/LiveTrafficPage';
import RoutePlanningPage from './pages/RoutePlanning/RoutePlanningPage';
import PredictionsPage from './pages/Predictions/PredictionsPage';
import IncidentsPage from './pages/Incidents/IncidentsPage';
import NearbyPage from './pages/Nearby/NearbyPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import HelpPage from './pages/Help/HelpPage';
import EmergencyAlertToast from './components/Emergency/EmergencyAlertToast';
import AuthPage from './components/Auth/AuthPage';
import GlobalLoader from './components/GlobalLoader/GlobalLoader';
import FloatingAssistant from './components/FloatingAssistant/FloatingAssistant';
import NotificationsModal from './components/Notifications/NotificationsModal';
import { getMe } from './api/authApi';
import './App.css';

// Simple UUID generator for the hackathon
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setRawActivePage] = useState('Home');
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Intercept page changes to show the loader
  const setActivePage = (page) => {
    if (page !== activePage) {
      setIsPageLoading(true);
      setRawActivePage(page);
      setTimeout(() => {
        setIsPageLoading(false);
      }, 800);
    }
  };
  
  // Emergency Chat State
  const [vehicleUuid, setVehicleUuid] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Initialize UUID and Auth State
  // We will now rely on the authenticated user ID for the vehicleUuid, 
  // so we can initialize it to null here and set it after login/getMe.
  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');

    if (token) {
      getMe().then((userData) => {
        setIsAuthenticated(true);
        // Bind the chat system's vehicleUuid to the actual user account!
        setVehicleUuid(`user-${userData.id}`);
      }).catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    }
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

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={(userData) => {
      setIsAuthenticated(true);
      if (userData && userData.id) {
         setVehicleUuid(`user-${userData.id}`);
      }
    }} />;
  }

  return (
    <div className="app-container">
      {activePage === 'Home' && <Header />}
      <div className="main-content">
        <Sidebar activePage={activePage} setActivePage={setActivePage} setIsAuthenticated={setIsAuthenticated} />
        <main className="page-content" style={{ position: 'relative' }}>
          {isPageLoading && <GlobalLoader message={`Loading ${activePage}...`} />}
          
          {activePage === 'Home' && <HomePage setActivePage={setActivePage} />}
          {activePage === 'Live Traffic' && <LiveTrafficPage setActivePage={setActivePage} />}
          {activePage === 'Route Planning' && <RoutePlanningPage setActivePage={setActivePage} />}
          {activePage === 'Predictions' && <PredictionsPage setActivePage={setActivePage} />}
          {activePage === 'Incidents' && <IncidentsPage setActivePage={setActivePage} />}
          {activePage === 'Nearby' && <NearbyPage setActivePage={setActivePage} vehicleUuid={vehicleUuid} />}
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
      
      <FloatingAssistant />
      <NotificationsModal />
    </div>
  );
}

export default App;
