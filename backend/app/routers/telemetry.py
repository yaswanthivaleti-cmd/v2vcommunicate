from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.telemetry import TelemetryNode

router = APIRouter()

@router.get("/nodes")
def get_telemetry_nodes(db: Session = Depends(get_db)):
    nodes = db.query(TelemetryNode).all()
    return [{"id": n.id, "type": n.node_type, "status": n.status, "simulated": n.simulated} for n in nodes]
