import axiosInstance from './axiosInstance';

// Compare multiple GitHub usernames
// usernames = ["torvalds", "gaearon", "yyx990803"]
export const compareUsersApi = async (usernames) => {
  const res = await axiosInstance.post('/compare', { usernames });
  return res.data;
};