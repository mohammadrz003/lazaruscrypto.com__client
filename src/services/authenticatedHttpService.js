import axios from "axios";

const LOCAL_STORAGE_AUTH_KEY = process.env.REACT_APP_LOCAL_STORAGE_AUTH_KEY;

const mainAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor for API calls
mainAxiosInstance.interceptors.request.use(
  async (config) => {
    const account = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    const keys = JSON.parse(account);
    config.headers = {
      Authorization: keys.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const authenticatedHttp = {
  get: mainAxiosInstance.get,
  post: mainAxiosInstance.post,
  put: mainAxiosInstance.put,
  delete: mainAxiosInstance.delete,
};

export default authenticatedHttp;
