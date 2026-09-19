from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class Trip(Base, TimestampMixin):
    __tablename__ = "trips"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    route_id = Column(String, ForeignKey("routes.id"))
    status = Column(String, default="planned") # planned, active, completed, cancelled
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    actual_duration_minutes = Column(Float, nullable=True)
    
    events = relationship("TripEvent", back_populates="trip")

class TripEvent(Base, TimestampMixin):
    __tablename__ = "trip_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    trip_id = Column(String, ForeignKey("trips.id"), nullable=False)
    event_type = Column(String) # reroute, delay, incident_encountered
    description = Column(String)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    trip = relationship("Trip", back_populates="events")
