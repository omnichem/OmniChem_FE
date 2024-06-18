import axios from 'axios';
import { AuthProvider } from '../../contexts/authContext';

const http = axios.create({
  baseURL: import.meta.env.APP_API_URL,
  withCredentials: false,
});

// Request interceptor to add the access token to each request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.APP_API_URL}/api/auth/jwt/refresh/`,
      {},
      { withCredentials: true }
    );
    localStorage.setItem('token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    return null;
  }
};

// Response interceptor to handle 401 errors
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest);
      } else {
        // Log out the user if refreshing the token fails
        AuthProvider.logOut();
      }
    }
    return Promise.reject(error);
  }
);

export { http };
