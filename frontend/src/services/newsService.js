import api from './api';

export const newsService = {
 getLatestNews: async () => {
  const response = await api.get('/news/');
  return response.data;
 },
};

export default newsService;
