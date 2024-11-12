import axios from "axios";

// Set up the base URL for the API (pointing to your ASP.NET Core backend)
const baseUrl = "http://localhost:5213/api/";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json", // Default content type for API requests
  },
});

const handleBefore = (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(handleBefore, (error) => {
  return Promise.reject(error);
});


export default api;
