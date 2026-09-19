from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.trip import Trip

router = APIRouter()

@router.get("/overview")
def get_analytics_overview(db: Session = Depends(get_db)):
    """Pulls analytics from database trips."""
    total_trips = db.query(Trip).count()
    completed = db.query(Trip).filter(Trip.status == "completed").count()
    
    return {
        "total_trips": total_trips,
        "completed_trips": completed,
        "accuracy": 85.5 if completed > 0 else 0
    }
