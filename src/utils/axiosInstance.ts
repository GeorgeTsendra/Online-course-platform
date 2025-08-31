import axios, { AxiosError } from "axios";
import { config } from "./configInstance";
import { getToken } from "./auth";

const API_URL = config.REACT_APP_API_URL ?? "/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (requestConfig) => {
    if (typeof window !== "undefined") {
      const token = getToken();

      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => error
);

export default api;
