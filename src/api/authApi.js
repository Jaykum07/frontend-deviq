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
  console.log('Attempting Login with:', { email, password });
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

//update name
export const updateProfileApi = async (name) =>{
  const res = await axiosInstance.put('/auth/update-profile', {name});
  return res.data;
}

//Change password
export const changePasswordApi = async (currentPassword, newPassword) =>{
  const res = await axiosInstance.put('/auth/change-password', {
    currentPassword,
    newPassword,
  });
  
  return res.data;
}