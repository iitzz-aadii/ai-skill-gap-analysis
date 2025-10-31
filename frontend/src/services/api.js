import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Analysis API
export const analyzeResume = async (formData) => {
  const response = await api.post('/api/analysis/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAnalysisHistory = async (limit = 10, skip = 0) => {
  const response = await api.get('/api/analysis/history', {
    params: { limit, skip },
  });
  return response.data;
};

export const getAnalysisById = async (id) => {
  const response = await api.get(`/api/analysis/history/${id}`);
  return response.data;
};

// Chat API
export const sendChatMessage = async (message, context = null) => {
  const response = await api.post('/api/chat/message', {
    message,
    context,
  });
  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get('/api/chat/history');
  return response.data;
};

export const clearChatHistory = async () => {
  const response = await api.delete('/api/chat/history');
  return response.data;
};

// Progress API
export const createProgress = async (data) => {
  const response = await api.post('/api/progress/', null, {
    params: {
      user_id: data.user_id,
      skill: data.skill,
      target_level: data.target_level || 3.0,
    },
  });
  return response.data;
};

export const getUserProgress = async (userId) => {
  const response = await api.get(`/api/progress/${userId}`);
  return response.data;
};

export const updateProgress = async (progressId, data) => {
  const response = await api.put(`/api/progress/${progressId}`, null, {
    params: data,
  });
  return response.data;
};

export const deleteProgress = async (progressId) => {
  const response = await api.delete(`/api/progress/${progressId}`);
  return response.data;
};

export default api;
