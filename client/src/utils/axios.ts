import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./constant";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

export default api;
