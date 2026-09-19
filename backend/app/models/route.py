from sqlalchemy import Column, String, Float, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class Route(Base, TimestampMixin):
    __tablename__ = "routes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    origin = Column(String)
    destination = Column(String)
    base_duration_minutes = Column(Float)
    base_distance_km = Column(Float)
    geometry_polyline = Column(String)
    
    segments = relationship("RouteSegment", back_populates="route", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="route")

class RouteSegment(Base, TimestampMixin):
    __tablename__ = "route_segments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    route_id = Column(String, ForeignKey("routes.id"), nullable=False)
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=False)
    sequence_order = Column(Integer)

    route = relationship("Route", back_populates="segments")
    # relationship to road_segments defined in RoadSegment

class Prediction(Base, TimestampMixin):
    __tablename__ = "predictions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    route_id = Column(String, ForeignKey("routes.id"), nullable=False)
    prediction_time_window = Column(Integer) # e.g., 5, 10, 15 (minutes into future)
    predicted_duration_minutes = Column(Float)
    confidence_score = Column(Float)
    model_type = Column(String, default="rule_based")
    model_status = Column(String, default="prototype")

    route = relationship("Route", back_populates="predictions")
    factors = relationship("PredictionFactor", back_populates="prediction")

class PredictionFactor(Base, TimestampMixin):
    __tablename__ = "prediction_factors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    prediction_id = Column(String, ForeignKey("predictions.id"), nullable=False)
    factor_type = Column(String) # weather, incident, historical_trend
    impact_score = Column(Float)
    description = Column(String)

    prediction = relationship("Prediction", back_populates="factors")
