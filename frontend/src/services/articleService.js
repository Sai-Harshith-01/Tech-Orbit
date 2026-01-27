import api from './api';

export const articleService = {
 getAllArticles: async () => {
  const response = await api.get('/student/articles/');
  return response.data;
 },

 postArticle: async (formData) => {
  const response = await api.post('/student/articles/', formData, {
   headers: {
    'Content-Type': 'multipart/form-data',
   },
  });
  return response.data;
 },

 addComment: async (articleId, message) => {
  const response = await api.post(`/student/articles/${articleId}/comment`, { message });
  return response.data;
 },

 deleteArticle: async (articleId) => {
  const response = await api.delete(`/student/articles/${articleId}`);
  return response.data;
 },
};

export default articleService;
