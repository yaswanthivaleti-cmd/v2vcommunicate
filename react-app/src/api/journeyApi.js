import { apiClient } from './client';

// Simulated Fallback Data
const MOCK_JOURNEY_RESPONSE = {
  current_conditions: {
    traffic_level: "moderate",
    average_speed: 32,
    trend: "increasing"
  },
  prediction: {
    five_minute: 28,
    ten_minute: 24,
    fifteen_minute: 20,
    confidence: 0.82,
    model_type: "rule_based",
    model_status: "prototype"
  },
  journey_impact: {
    current_eta: 34,
    predicted_eta: 42,
    potential_delay: 8
  },
  recommendation: {
    action: "consider_alternative",
    route_id: "route_b",
    potential_saving: 7,
    reason: "Alternative route avoids predicted congestion."
  }
};

export const journeyApi = {
  async analyzeJourney(origin, destination) {
    try {
      // Phase P: Try live backend
      return await apiClient.post('/journey/analyze', { origin, destination });
    } catch (error) {
      console.warn("Backend unavailable. Using simulated journey data.");
      // Fallback
      return new Promise(resolve => setTimeout(() => resolve(MOCK_JOURNEY_RESPONSE), 800));
    }
  }
};
