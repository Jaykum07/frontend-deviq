import axiosInstance from './axiosInstance';

// Register new account
export const registerApi = async (name, email, password) => {
  const res = await axiosInstance.post('/auth/register', {
    name,
    email,
    password,
  });
  return res.data;
};

// Login
export const loginApi = async (email, password) => {
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data;
};

// Logout
export const logoutApi = async () => {
  const res = await axiosInstance.post('/auth/logout');
  return res.data;
};

// Get current logged in user
export const getMeApi = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data;
};