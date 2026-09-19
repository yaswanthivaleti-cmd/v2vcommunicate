import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import './HomePage.css';
import SearchCard from '../../components/Cards/SearchCard/SearchCard';
import AlertCard from '../../components/Cards/AlertCard/AlertCard';
import TrafficCard from '../../components/Cards/BottomCards/TrafficCard';
import ForecastCard from '../../components/Cards/BottomCards/ForecastCard';
import JourneyCard from '../../components/Cards/BottomCards/JourneyCard';
import RecommendationCard from '../../components/Cards/BottomCards/RecommendationCard';

const HomePage = ({ setActivePage }) => {
  // Phagwara, Punjab coordinates
  const mapCenter = [31.224, 75.7708];

  // Dummy coordinates for the route lines to simulate the screenshot
  const mainRoute = [
    [31.23, 75.76],
    [31.22, 75.77],
    [31.21, 75.78],
    [31.20, 75.775]
  ];
  
  const altRoute = [
    [31.21, 75.78],
    [31.20, 75.785],
    [31.19, 75.78]
  ];

  return (
    <div className="home-page">
      {/* Real Map Background */}
      <div className="map-background">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* Simulated Route Lines */}
          <Polyline positions={mainRoute} color="#f97316" weight={5} />
          <Polyline positions={altRoute} color="#10b981" weight={5} />
          
          {/* Dummy Marker */}
          <Marker position={[31.22, 75.77]}>
            <Popup>
              Moderate traffic reported here.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Top Left: Search & Legend */}
      <div className="top-left-overlay">
        <SearchCard setActivePage={setActivePage} />
        
        <div className="map-legend">
          <div className="legend-item"><span className="legend-dot smooth"></span> Smooth</div>
          <div className="legend-item"><span className="legend-dot moderate"></span> Moderate</div>
          <div className="legend-item"><span className="legend-dot heavy"></span> Heavy</div>
          <div className="legend-item"><span className="legend-dot severe"></span> Severe</div>
        </div>
      </div>

      {/* Top Right: Alerts */}
      <div className="top-right-overlay">
        <AlertCard setActivePage={setActivePage} />
      </div>

      {/* Bottom Row: Info Cards */}
      <div className="bottom-overlay">
        <TrafficCard />
        <ForecastCard />
        <JourneyCard />
        <RecommendationCard setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default HomePage;
