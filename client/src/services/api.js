import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const habitAPI = {
  getAll: () => api.get("/habits"),
  getStats: () => api.get("/habits/stats"),
  create: (data) => api.post("/habits", data),
  update: (id, data) => api.put(`/habits/${id}`, data),
  delete: (id) => api.delete(`/habits/${id}`),
  toggleComplete: (id) => api.patch(`/habits/${id}/toggle`),
};

export default api;
