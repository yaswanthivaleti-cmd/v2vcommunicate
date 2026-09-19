from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/")
def get_settings(db: Session = Depends(get_db)):
    # Mock settings return
    return {
        "region": "Delhi NCR",
        "ai_model": "rule_based_v1",
        "alerts_enabled": True
    }
