from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    origin_lat = Column(Float, nullable=False)
    origin_lng = Column(Float, nullable=False)
    dest_lat = Column(Float, nullable=False)
    dest_lng = Column(Float, nullable=False)
    status = Column(String, default="PLANNED") # PLANNED, ACTIVE, COMPLETED, CANCELLED
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="trips")
    route_options = relationship("RouteOption", back_populates="trip")
    alerts = relationship("Alert", back_populates="trip")
    decisions = relationship("UserDecision", back_populates="trip")

class RouteOption(Base):
    __tablename__ = "route_options"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    provider_route_id = Column(String)
    distance_meters = Column(Integer)
    current_eta_seconds = Column(Integer)
    geometry = Column(String) # GeoJSON or encoded polyline
    is_selected = Column(Integer, default=0) # 1 if selected by user
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    trip = relationship("Trip", back_populates="route_options")
