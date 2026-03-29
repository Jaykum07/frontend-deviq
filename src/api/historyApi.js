import axiosInstance from './axiosInstance';

// Get search history — paginated
export const getHistoryApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/history?page=${page}&limit=${limit}`);
  return res.data;
};

// Delete one history entry
export const deleteOneHistoryApi = async (id) => {
  const res = await axiosInstance.delete(`/history/${id}`);
  return res.data;
};

// Clear all history
export const clearAllHistoryApi = async () => {
  const res = await axiosInstance.delete('/history');
  return res.data;
};