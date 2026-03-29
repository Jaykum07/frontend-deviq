import axiosInstance from './axiosInstance';

// Analyze a GitHub username
export const analyzeUserApi = async (username) => {
  const res = await axiosInstance.post(`/github/analyze/${username}`);
  return res.data;
};