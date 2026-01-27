import api from './api';

export const hackathonService = {
 // Student endpoints
 getAllHackathons: async () => {
  const response = await api.get('/hackathons');
  return response.data;
 },

 registerForHackathon: async (hackathonId) => {
  const response = await api.post(`/hackathons/${hackathonId}/register`);
  return response.data;
 },

 getMyRegistrations: async () => {
  const response = await api.get('/hackathons/my-registrations');
  return response.data;
 },

 // College endpoints
 getCollegeHackathons: async () => {
  const response = await api.get('/college/hackathons');
  return response.data;
 },

 createHackathon: async (formData) => {
  const response = await api.post('/college/hackathons', formData, {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
  });
  return response.data;
 },

 deleteHackathon: async (hackathonId) => {
  const response = await api.delete(`/college/hackathons/${hackathonId}`);
  return response.data;
 },

 getHackathonRegistrations: async (hackathonId) => {
  const response = await api.get(`/college/hackathons/${hackathonId}/registrations`);
  return response.data;
 },

 getCollegeStats: async () => {
  const response = await api.get('/college/stats/overview');
  return response.data;
 },
};

export default hackathonService;
