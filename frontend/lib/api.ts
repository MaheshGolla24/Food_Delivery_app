import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8001/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;