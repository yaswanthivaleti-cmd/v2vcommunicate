from sqlalchemy import Column, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class Incident(Base, TimestampMixin):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(String) # accident, construction, hazard
    severity = Column(String) # minor, major, critical
    latitude = Column(Float)
    longitude = Column(Float)
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=True)
    status = Column(String, default="active") # active, resolved, clearing
    cleared_at = Column(DateTime(timezone=True), nullable=True)
    
    # Data Quality
    source = Column(String, default="demo")
    data_status = Column(String, default="live")
    quality = Column(String, default="good")

    confirmations = relationship("IncidentConfirmation", back_populates="incident")


class IncidentConfirmation(Base, TimestampMixin):
    __tablename__ = "incident_confirmations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=False)
    source_type = Column(String) # v2x, user, camera
    confidence_score = Column(Float)
    simulated = Column(Boolean, default=True) # Per user request for V2X/IoT

    incident = relationship("Incident", back_populates="confirmations")
