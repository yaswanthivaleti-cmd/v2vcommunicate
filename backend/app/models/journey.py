from sqlalchemy import Column, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid

from app.models.base import Base, TimestampMixin

class JourneyAnalysis(Base, TimestampMixin):
    __tablename__ = "journey_analyses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    origin = Column(String)
    destination = Column(String)
    recommended_route_id = Column(String, ForeignKey("routes.id"), nullable=True)
    potential_delay_minutes = Column(Float)
    potential_savings_minutes = Column(Float)
    
    recommendation = relationship("Recommendation", back_populates="journey_analysis", uselist=False)

class Recommendation(Base, TimestampMixin):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    journey_analysis_id = Column(String, ForeignKey("journey_analyses.id"), nullable=False)
    action = Column(String) # consider_alternative, delay_trip, proceed
    reasoning = Column(String)
    
    journey_analysis = relationship("JourneyAnalysis", back_populates="recommendation")
    factors = relationship("RecommendationFactor", back_populates="recommendation")

class RecommendationFactor(Base, TimestampMixin):
    __tablename__ = "recommendation_factors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    recommendation_id = Column(String, ForeignKey("recommendations.id"), nullable=False)
    factor_name = Column(String)
    impact_value = Column(Float)

    recommendation = relationship("Recommendation", back_populates="factors")
