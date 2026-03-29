import axiosInstance from './axiosInstance';

// Save a report
export const createReportApi = async (reportData) => {
  const res = await axiosInstance.post('/reports', reportData);
  return res.data;
};

// Get all my reports
export const getReportsApi = async () => {
  const res = await axiosInstance.get('/reports');
  return res.data;
};

// Get one report
export const getOneReportApi = async (id) => {
  const res = await axiosInstance.get(`/reports/${id}`);
  return res.data;
};

// Delete a report
export const deleteReportApi = async (id) => {
  const res = await axiosInstance.delete(`/reports/${id}`);
  return res.data;
};