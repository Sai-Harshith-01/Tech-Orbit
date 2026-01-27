import api from './api';

const decodeToken = (token) => {
 try {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
 } catch (e) {
  return null;
 }
};

export const authService = {
 registerStudent: async (email, password) => {
  const response = await api.post('/auth/register/student', { email, password });
  return response.data;
 },

 registerCollege: async (email, website, password) => {
  const response = await api.post('/auth/register/college', { email, website, password });
  return response.data;
 },

 login: async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { access_token, role, user_id } = response.data;

  localStorage.setItem('token', access_token);
  localStorage.setItem('role', role);
  localStorage.setItem('user_id', user_id);

  return { token: access_token, role, user_id };
 },

 logout: () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user_id');
 },

 getRole: () => localStorage.getItem('role'),

 getUserId: () => {
  const storedId = localStorage.getItem('user_id');
  if (storedId) return storedId;

  const token = localStorage.getItem('token');
  if (token) {
   const payload = decodeToken(token);
   return payload ? payload.user_id : null;
  }
  return null;
 },

 isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
