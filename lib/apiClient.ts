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
    if (
      res.data.message === "Unauthorized" &&
      !res.config?.url?.includes("/api/auth/super-admin/login")
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return res;
  },
  (err) => {
    if (!err.response) {
      return Promise.reject(err);
    }

    const status = err.response.status;
    const requestUrl = err.config?.url ?? "";
    const isLoginRequest =
      typeof requestUrl === "string" &&
      requestUrl.includes("/api/auth/super-admin/login");

    if ((status === 401 || status === 403) && !isLoginRequest) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);
