import axios from 'axios';

export const setupAxiosInterceptors = (getToken) => {
  axios.interceptors.request.use(async (config) => {
    // Get the Clerk token
    const token = await getToken();

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};
