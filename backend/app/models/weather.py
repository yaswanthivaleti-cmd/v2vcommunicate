from sqlalchemy import Column, String, Float, Integer, ForeignKey
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class WeatherSnapshot(Base, TimestampMixin):
    __tablename__ = "weather_snapshots"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    region = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    condition = Column(String) # Clear, Rain, Fog, etc.
    temperature_c = Column(Float)
    visibility_km = Column(Float)
    precipitation_mm = Column(Float)
    # Data Quality
    source = Column(String, default="demo")
    data_status = Column(String, default="live")
    quality = Column(String, default="good")

    impacts = relationship("WeatherImpact", back_populates="snapshot")


class WeatherImpact(Base, TimestampMixin):
    __tablename__ = "weather_impacts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    weather_snapshot_id = Column(String, ForeignKey("weather_snapshots.id"), nullable=False)
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=False)
    speed_reduction_factor = Column(Float) # e.g. 0.8 means 20% reduction
    risk_level = Column(String) # low, medium, high

    snapshot = relationship("WeatherSnapshot", back_populates="impacts")
