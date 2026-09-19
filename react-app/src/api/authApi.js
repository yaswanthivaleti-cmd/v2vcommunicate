import { apiClient } from "./client";

export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  
  const response = await apiClient.post("/auth/login", params);
  localStorage.setItem("token", response.access_token);
  return response;
};

export const registerUser = async (email, password) => {
  return await apiClient.post("/auth/register", { email, password });
};

export const getMe = async () => {
  return await apiClient.get("/auth/me");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
