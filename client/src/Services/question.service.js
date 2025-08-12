import { apiClient } from './apiClient.service';

export const questionService = {
  // Lấy tất cả câu hỏi
  getAllQuestions: (query = '') => {
    return apiClient.get(`/questions${query}`);
  },

  // Lấy thông tin một câu hỏi
  getQuestionById: (questionId) => {
    return apiClient.get(`/questions/${questionId}`);
  },

  // Tạo câu hỏi mới
  createQuestion: (questionData) => {
    return apiClient.post('/questions', questionData);
  },

  // Cập nhật câu hỏi
  updateQuestion: (questionId, questionData) => {
    return apiClient.put(`/questions/${questionId}`, questionData);
  },

  // Xóa câu hỏi
  deleteQuestion: (questionId) => {
    return apiClient.delete(`/questions/${questionId}`);
  },

  // Lấy câu hỏi theo môn học
  getQuestionsBySubject: (subjectId, query = '') => {
    return apiClient.get(`/questions/subject/${subjectId}${query}`);
  },

  // Lấy câu hỏi theo loại
  getQuestionsByType: (type, query = '') => {
    return apiClient.get(`/questions/type/${type}${query}`);
  },

  // Lấy câu hỏi theo độ khó
  getQuestionsByDifficulty: (difficulty, query = '') => {
    return apiClient.get(`/questions/difficulty/${difficulty}${query}`);
  },

  // Tìm kiếm câu hỏi
  searchQuestions: (searchQuery, filters = {}) => {
    const queryString = new URLSearchParams({
      search: searchQuery,
      ...filters
    }).toString();
    return apiClient.get(`/questions/search?${queryString}`);
  },

  // Sao chép câu hỏi
  duplicateQuestion: (questionId, newData = {}) => {
    return apiClient.post(`/questions/${questionId}/duplicate`, newData);
  },

  // Import câu hỏi từ file
  importQuestions: (formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/questions/import`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(response => response.json());
  },

  // Export câu hỏi
  exportQuestions: (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiClient.get(`/questions/export?${queryString}`);
  },

  // Cập nhật trạng thái câu hỏi
  updateQuestionStatus: (questionId, status) => {
    return apiClient.put(`/questions/${questionId}/status`, { status });
  },

  // Lấy thống kê câu hỏi
  getQuestionStatistics: () => {
    return apiClient.get('/questions/statistics');
  },
};
