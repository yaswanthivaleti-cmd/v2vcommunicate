const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const apiClient = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[API GET ${endpoint}] Error:`, error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      // Check if data is URLSearchParams for OAuth2 form data
      const isFormData = data instanceof URLSearchParams;
      
      const headers = getHeaders();
      if (isFormData) {
        delete headers["Content-Type"]; // let browser handle it or explicitly set application/x-www-form-urlencoded
        headers["Content-Type"] = "application/x-www-form-urlencoded";
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: headers,
        body: isFormData ? data : JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[API POST ${endpoint}] Error:`, error);
      throw error;
    }
  }
};
