import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach token with "Admin " prefix
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Admin ${token}`;
  }
  return config;
});

// Handle 401 / 403 → redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("admin_token");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export const API_ORIGIN = import.meta.env.VITE_API_BASE_URL as string;
