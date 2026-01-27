import api from './api';

export const adminService = {
 getPendingColleges: async () => {
  const response = await api.get('/admin/colleges/pending');
  return response.data;
 },

 approveCollege: async (collegeId) => {
  const response = await api.put(`/admin/colleges/${collegeId}/approve`);
  return response.data;
 },

 rejectCollege: async (collegeId) => {
  const response = await api.put(`/admin/colleges/${collegeId}/reject`);
  return response.data;
 },

 getOverviewStats: async () => {
  const response = await api.get('/admin/stats/overview');
  return response.data;
 },

 getMonthlyHackathons: async () => {
  const response = await api.get('/admin/stats/hackathons/monthly');
  return response.data;
 },

 getMonthlyRegistrations: async () => {
  const response = await api.get('/admin/stats/registrations/monthly');
  return response.data;
 },
};

export default adminService;
