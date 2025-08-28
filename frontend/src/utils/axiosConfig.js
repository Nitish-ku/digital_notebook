import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const setupAxiosInterceptors = (getToken) => {
  API.interceptors.request.use(async (config) => {
    // Get the Clerk token
    const token = await getToken();

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export default API;
