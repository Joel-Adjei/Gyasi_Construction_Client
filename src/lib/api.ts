import axios from "axios";

export const TOKEN_KEY = "sc_admin_token";

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) ?? "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Normalise MongoDB _id → id
export const normalizeId = <T extends { _id?: string; id?: string }>(
  doc: T,
): T & { id: string } => ({
  ...doc,
  id: (doc._id ?? doc.id) as string,
});
