import { apiClient } from './apiClient.service';

export const submissionService = {
  // Lấy tất cả bài nộp
  getAllSubmissions: (query = '') => {
    return apiClient.get(`/submissions${query}`);
  },

  // Lấy thông tin một bài nộp
  getSubmissionById: (submissionId) => {
    return apiClient.get(`/submissions/${submissionId}`);
  },

  // Tạo bài nộp mới
  createSubmission: (submissionData) => {
    return apiClient.post('/submissions', submissionData);
  },

  // Cập nhật bài nộp
  updateSubmission: (submissionId, submissionData) => {
    return apiClient.put(`/submissions/${submissionId}`, submissionData);
  },

  // Xóa bài nộp
  deleteSubmission: (submissionId) => {
    return apiClient.delete(`/submissions/${submissionId}`);
  },

  // Lấy bài nộp theo bài tập
  getSubmissionsByAssignment: (assignmentId, query = '') => {
    return apiClient.get(`/submissions/assignment/${assignmentId}${query}`);
  },

  // Lấy bài nộp của học sinh
  getSubmissionsByStudent: (studentId, query = '') => {
    return apiClient.get(`/submissions/student/${studentId}${query}`);
  },

  // Nộp bài tập
  submitAssignment: (assignmentId, submissionData) => {
    return apiClient.post(`/submissions/submit/${assignmentId}`, submissionData);
  },

  // Upload file đính kèm
  uploadAttachment: (submissionId, formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/submissions/${submissionId}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(response => response.json());
  },

  // Chấm điểm bài nộp
  gradeSubmission: (submissionId, gradeData) => {
    return apiClient.put(`/submissions/${submissionId}/grade`, gradeData);
  },

  // Thêm nhận xét
  addFeedback: (submissionId, feedback) => {
    return apiClient.post(`/submissions/${submissionId}/feedback`, { feedback });
  },

  // Cập nhật trạng thái bài nộp
  updateSubmissionStatus: (submissionId, status) => {
    return apiClient.put(`/submissions/${submissionId}/status`, { status });
  },

  // Lấy lịch sử chấm điểm
  getGradingHistory: (submissionId) => {
    return apiClient.get(`/submissions/${submissionId}/grading-history`);
  },
};
