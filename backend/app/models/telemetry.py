from sqlalchemy import Column, String, Float, Boolean, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class TelemetryNode(Base, TimestampMixin):
    __tablename__ = "telemetry_nodes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    node_type = Column(String) # v2x_node, camera, loop_detector
    location_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String, default="online")
    simulated = Column(Boolean, default=True) # Following user instructions

    readings = relationship("TelemetryReading", back_populates="node")

class TelemetryReading(Base, TimestampMixin):
    __tablename__ = "telemetry_readings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    node_id = Column(String, ForeignKey("telemetry_nodes.id"), nullable=False)
    reading_type = Column(String) # speed, count, event
    value = Column(Float)
    raw_payload = Column(JSON, nullable=True)
    
    node = relationship("TelemetryNode", back_populates="readings")

class ModelConfig(Base, TimestampMixin):
    __tablename__ = "model_configs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name = Column(String)
    model_type = Column(String, default="rule_based")
    version = Column(String)
    is_active = Column(Boolean, default=True)
    parameters = Column(JSON, nullable=True)

class ModelCalibrationConfig(Base, TimestampMixin):
    __tablename__ = "model_calibration_configs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    model_config_id = Column(String, ForeignKey("model_configs.id"))
    last_calibrated_at = Column(String)
    calibration_metrics = Column(JSON, nullable=True)

class RegionConfig(Base, TimestampMixin):
    __tablename__ = "region_configs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    region_name = Column(String)
    center_lat = Column(Float)
    center_lng = Column(Float)
    zoom_level = Column(Integer)
    is_active = Column(Boolean, default=True)

class CorridorFeedConfig(Base, TimestampMixin):
    __tablename__ = "corridor_feed_configs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    corridor_id = Column(String, ForeignKey("corridors.id"))
    provider_name = Column(String)
    refresh_interval_seconds = Column(Integer)
    is_active = Column(Boolean, default=True)
