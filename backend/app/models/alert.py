from sqlalchemy import Column, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class Alert(Base, TimestampMixin):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    type = Column(String) # congestion, weather, incident
    severity = Column(String) # low, medium, high, critical
    message = Column(String)
    is_active = Column(Boolean, default=True)
    region = Column(String, nullable=True)
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=True)

class AlertRule(Base, TimestampMixin):
    __tablename__ = "alert_rules"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    condition_type = Column(String) # e.g. "speed_drop", "incident_reported"
    threshold_value = Column(Float)
    is_enabled = Column(Boolean, default=True)

class WebhookConfig(Base, TimestampMixin):
    __tablename__ = "webhook_configs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    url = Column(String)
    is_enabled = Column(Boolean, default=True)

class NotificationConfig(Base, TimestampMixin):
    __tablename__ = "notification_configs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    channel = Column(String) # email, sms, in_app
    is_enabled = Column(Boolean, default=True)
