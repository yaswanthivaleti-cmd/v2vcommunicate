from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    preference = relationship("UserPreference", back_populates="user", uselist=False)
    trips = relationship("Trip", back_populates="user")
    alerts = relationship("Alert", back_populates="user")
    decisions = relationship("UserDecision", back_populates="user")

class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    priority = Column(String, default="FASTEST") # FASTEST, SHORTEST, AVOID_CONGESTION, RELIABLE_ARRIVAL
    
    user = relationship("User", back_populates="preference")
