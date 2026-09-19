from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime, timezone
from app.db.database import Base

class TrafficObservation(Base):
    __tablename__ = "traffic_observations"

    id = Column(Integer, primary_key=True, index=True)
    segment_id = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    current_speed = Column(Float)
    free_flow_speed = Column(Float)
    congestion_ratio = Column(Float)
    confidence = Column(Float, nullable=True)
    provider = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

class WeatherObservation(Base):
    __tablename__ = "weather_observations"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    temperature = Column(Float)
    condition = Column(String)
    visibility = Column(Float, nullable=True)
    provider = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    type = Column(String)
    severity = Column(String)
    description = Column(String, nullable=True)
    provider = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

class TrafficPrediction(Base):
    __tablename__ = "traffic_predictions"

    id = Column(Integer, primary_key=True, index=True)
    segment_id = Column(String, index=True)
    horizon_minutes = Column(Integer)
    predicted_congestion = Column(String)
    contributing_factors = Column(String) # JSON string
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
