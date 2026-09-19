from sqlalchemy import Column, String, JSON
import uuid

from app.models.base import Base, TimestampMixin

class Operator(Base, TimestampMixin):
    __tablename__ = "operators"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="viewer")
    # Note: No authentication fields per user request
    is_active = Column(String, default=True)

class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    operator_id = Column(String, nullable=True) # Can be anonymous during prototype
    action = Column(String)
    resource_type = Column(String)
    resource_id = Column(String)
    details = Column(JSON, nullable=True)

class AssistantQuery(Base, TimestampMixin):
    __tablename__ = "assistant_queries"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    query_text = Column(String, nullable=False)
    response_text = Column(String, nullable=False)
    context_used = Column(JSON, nullable=True)
