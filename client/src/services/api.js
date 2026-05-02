import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const habitAPI = {
  getAll: () => api.get("/habits"),
  getStats: () => api.get("/habits/stats"),
  create: (data) => api.post("/habits", data),
  update: (id, data) => api.put(`/habits/${id}`, data),
  delete: (id) => api.delete(`/habits/${id}`),
  toggleComplete: (id) => api.patch(`/habits/${id}/toggle`),
  toggleDate: (id, date) => api.patch(`/habits/${id}/toggle-date`, { date }),
};

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

export default api;
