// axiosInstance.js
// This is the BASE axios configuration
// Every API call in the project uses THIS instance
// So we only set the base URL and token logic ONCE here

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // import.meta.env = how Vite reads .env variables
  // reads VITE_API_URL from your .env file
});

// ── REQUEST INTERCEPTOR ───────────────────────────────────────────────────────
// Runs BEFORE every request is sent
// Automatically attaches token from localStorage to every request header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Every request now has: Authorization: Bearer eyJhbGci...
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR ──────────────────────────────────────────────────────
// Runs AFTER every response comes back
// If token expired (401), clear storage and redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,   // success — just return it

  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — force logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;