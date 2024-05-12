import axios from "axios";
// Components
import toast from "react-hot-toast";
// Config
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

export const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// BEFORE REQUEST
api.interceptors.request.use(
  async (config) => {
    // Set accessToken on Authorization
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    await sleep(500);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// AFTER REQUEST
api.interceptors.response.use(undefined, async (err) => {
  const msgError = err.response.data?.message;

  const customError = msgError;

  if (err.response.status === 401) {
    toast.error("Expired session!");

    window.localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    window.location.href = "/login"
  }

  return Promise.reject(customError);
});
