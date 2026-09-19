from app.models.base import Base
from app.models.traffic import Corridor, RoadSegment, TrafficSnapshot, TrafficTrend
from app.models.weather import WeatherSnapshot, WeatherImpact
from app.models.incident import Incident, IncidentConfirmation
from app.models.route import Route, RouteSegment, Prediction, PredictionFactor
from app.models.journey import JourneyAnalysis, Recommendation, RecommendationFactor
from app.models.trip import Trip, TripEvent
from app.models.alert import Alert, AlertRule, WebhookConfig, NotificationConfig
from app.models.telemetry import TelemetryNode, TelemetryReading, ModelConfig, ModelCalibrationConfig, RegionConfig, CorridorFeedConfig
from app.models.admin import Operator, AuditLog, AssistantQuery
