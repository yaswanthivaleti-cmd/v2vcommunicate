import uuid
from app.database import SessionLocal, engine
from app.models.base import Base
from app.models.traffic import Corridor, RoadSegment, TrafficSnapshot
from app.models.weather import WeatherSnapshot, WeatherImpact
from app.models.incident import Incident, IncidentConfirmation
from app.models.route import Route, RouteSegment
from app.models.telemetry import TelemetryNode, TelemetryReading
from app.models.admin import Operator, AuditLog
from app.core.logging import logger

def seed_database():
    db = SessionLocal()
    
    try:
        # Check if we already seeded by counting Corridors
        if db.query(Corridor).count() > 0:
            logger.info("Database already seeded.")
            return

        logger.info("Seeding database with Delhi NCR demo data...")
        
        # 1. Operators
        admin = Operator(username="admin", email="admin@trafficai.gov.in", role="admin")
        db.add(admin)

        # 2. Corridors
        corr_orr = Corridor(
            id=str(uuid.uuid4()),
            name="Outer Ring Road", 
            description="Major arterial ring road in Delhi",
            start_lat=28.5355, start_lng=77.1558,
            end_lat=28.6139, end_lng=77.2090
        )
        corr_nh48 = Corridor(
            id=str(uuid.uuid4()),
            name="NH-48 (Delhi-Gurgaon Expressway)", 
            description="High speed corridor connecting Delhi and Gurgaon",
            start_lat=28.5562, start_lng=77.0999,
            end_lat=28.4595, end_lng=77.0266
        )
        db.add_all([corr_orr, corr_nh48])
        db.flush()

        # 3. Road Segments for ORR
        seg1 = RoadSegment(
            id=str(uuid.uuid4()), corridor_id=corr_orr.id, name="Hauz Khas to IIT Delhi",
            start_lat=28.5494, start_lng=77.2001, end_lat=28.5450, end_lng=77.1926,
            length_meters=1200.0, capacity_vehicles_per_hour=4000, speed_limit_kmh=60
        )
        seg2 = RoadSegment(
            id=str(uuid.uuid4()), corridor_id=corr_orr.id, name="IIT Delhi to Munirka",
            start_lat=28.5450, start_lng=77.1926, end_lat=28.5562, end_lng=77.1741,
            length_meters=2100.0, capacity_vehicles_per_hour=4000, speed_limit_kmh=60
        )
        db.add_all([seg1, seg2])
        db.flush()

        # 4. Traffic Snapshots
        db.add(TrafficSnapshot(
            road_segment_id=seg1.id, current_speed=25.0, free_flow_speed=60.0, 
            congestion_level="heavy", vehicle_count=350, source="demo", data_status="live", quality="good"
        ))
        db.add(TrafficSnapshot(
            road_segment_id=seg2.id, current_speed=45.0, free_flow_speed=60.0, 
            congestion_level="low", vehicle_count=120, source="demo", data_status="live", quality="good"
        ))

        # 5. Weather
        weather = WeatherSnapshot(
            id=str(uuid.uuid4()), region="Delhi NCR", latitude=28.6139, longitude=77.2090,
            condition="Rain", temperature_c=28.5, visibility_km=2.5, precipitation_mm=12.0,
            source="demo", data_status="live", quality="good"
        )
        db.add(weather)
        db.flush()
        
        db.add(WeatherImpact(
            weather_snapshot_id=weather.id, road_segment_id=seg1.id,
            speed_reduction_factor=0.75, risk_level="medium"
        ))

        # 6. Incidents
        incident = Incident(
            id=str(uuid.uuid4()), title="Waterlogging near IIT Flyover",
            description="Severe waterlogging causing slow traffic movement.",
            type="hazard", severity="major", latitude=28.5450, longitude=77.1926,
            road_segment_id=seg1.id, status="active",
            source="demo", data_status="live", quality="good"
        )
        db.add(incident)
        db.flush()

        db.add(IncidentConfirmation(
            incident_id=incident.id, source_type="v2x", confidence_score=0.92, simulated=True
        ))

        # 7. Telemetry / IoT
        node = TelemetryNode(
            id=str(uuid.uuid4()), node_type="camera", location_name="Hauz Khas Intersection",
            latitude=28.5494, longitude=77.2001, status="online", simulated=True
        )
        db.add(node)
        db.flush()
        db.add(TelemetryReading(
            node_id=node.id, reading_type="count", value=350.0
        ))

        # Commit all seeded data
        db.commit()
        logger.info("Demo data successfully seeded.")

    except Exception as e:
        db.rollback()
        logger.error(f"Failed to seed database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
