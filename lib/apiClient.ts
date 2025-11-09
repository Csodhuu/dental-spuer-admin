import axios from "axios";

import { getCookie } from "cookies-next";

export const BASEURL = "https://dental-backend-eekj.onrender.com";

export const service = axios.create({
  baseURL: "https://dental-backend-eekj.onrender.com",
});

service.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? getCookie("accessToken") : null;
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (res) => {
    if (res.data.message === "Unauthorized") {
      window.location.href = "/";
    }
    return res;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      if (window) {
        window.location.href = "/";
      }
    }
  }
);
