import axios from "axios";

export const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENDPOINT}`,
});

Api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("userToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

Api.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
