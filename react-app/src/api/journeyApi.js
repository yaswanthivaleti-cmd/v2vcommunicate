import { apiClient } from './client';

export const journeyApi = {
  async planJourney(origin, destination) {
    try {
      return await apiClient.post('/journey/plan', { origin, destination });
    } catch (error) {
      console.warn("Backend unavailable or journey plan failed.", error);
      throw error;
    }
  },
  
  async getTraffic(latitude, longitude) {
    try {
      return await apiClient.get(`/traffic/current?latitude=${latitude}&longitude=${longitude}`);
    } catch (error) {
      console.warn("Traffic data unavailable.", error);
      throw error;
    }
  },

  async getPrediction(latitude, longitude) {
    try {
      return await apiClient.get(`/traffic/prediction?latitude=${latitude}&longitude=${longitude}`);
    } catch (error) {
      console.warn("Prediction data unavailable.", error);
      throw error;
    }
  },

  async getWeather(latitude, longitude) {
    try {
      return await apiClient.get(`/weather/current?latitude=${latitude}&longitude=${longitude}`);
    } catch (error) {
      console.warn("Weather data unavailable.", error);
      throw error;
    }
  }
};
