from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/overview")
def get_dashboard_overview(db: Session = Depends(get_db)):
    # Mock aggregation for dashboard
    return {
        "active_corridors": 12,
        "critical_incidents": 2,
        "average_network_speed": 42.5,
        "congestion_index": 3.4
    }
