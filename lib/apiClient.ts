import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dental-backend-eekj.onrender.com",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("adminAccessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      deleteCookie("adminAccessToken");
    }
    return Promise.reject(err);
  }
);
