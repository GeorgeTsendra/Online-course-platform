import axios, { AxiosError } from "axios";
import { config } from "./configInstance";

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

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => error
);

export default api;
