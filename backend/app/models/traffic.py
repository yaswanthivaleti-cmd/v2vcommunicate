from sqlalchemy import Column, String, Float, Integer, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class Corridor(Base, TimestampMixin):
    __tablename__ = "corridors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, index=True)
    description = Column(String)
    # Storing bounding box or rough coordinates
    start_lat = Column(Float)
    start_lng = Column(Float)
    end_lat = Column(Float)
    end_lng = Column(Float)
    status = Column(String, default="active")
    
    segments = relationship("RoadSegment", back_populates="corridor", cascade="all, delete-orphan")


class RoadSegment(Base, TimestampMixin):
    __tablename__ = "road_segments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    corridor_id = Column(String, ForeignKey("corridors.id"), nullable=False)
    name = Column(String, nullable=False)
    start_lat = Column(Float, nullable=False)
    start_lng = Column(Float, nullable=False)
    end_lat = Column(Float, nullable=False)
    end_lng = Column(Float, nullable=False)
    length_meters = Column(Float)
    capacity_vehicles_per_hour = Column(Integer)
    speed_limit_kmh = Column(Integer, default=60)
    geometry_polyline = Column(String) # For mapping

    corridor = relationship("Corridor", back_populates="segments")
    traffic_snapshots = relationship("TrafficSnapshot", back_populates="segment")


class TrafficSnapshot(Base, TimestampMixin):
    __tablename__ = "traffic_snapshots"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=False)
    current_speed = Column(Float, nullable=False)
    free_flow_speed = Column(Float, nullable=False)
    congestion_level = Column(String) # low, moderate, heavy, severe
    vehicle_count = Column(Integer)
    # Data Quality fields per user request
    source = Column(String, default="demo")
    data_status = Column(String, default="live") # live, cached, simulated, unavailable
    quality = Column(String, default="good")
    
    segment = relationship("RoadSegment", back_populates="traffic_snapshots")


class TrafficTrend(Base, TimestampMixin):
    __tablename__ = "traffic_trends"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=False)
    time_window = Column(String) # e.g. "08:00-09:00"
    day_of_week = Column(Integer) # 0-6
    average_speed = Column(Float)
    historical_congestion_probability = Column(Float)
