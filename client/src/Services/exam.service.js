import { apiClient } from './apiClient.service';

export const examService = {
  // Lấy tất cả bài kiểm tra
  getAllExams: (query = '') => {
    return apiClient.get(`/exams${query}`);
  },

  // Lấy thông tin một bài kiểm tra
  getExamById: (examId) => {
    return apiClient.get(`/exams/${examId}`);
  },

  // Tạo bài kiểm tra mới
  createExam: (examData) => {
    return apiClient.post('/exams', examData);
  },

  // Cập nhật bài kiểm tra
  updateExam: (examId, examData) => {
    return apiClient.put(`/exams/${examId}`, examData);
  },

  // Xóa bài kiểm tra
  deleteExam: (examId) => {
    return apiClient.delete(`/exams/${examId}`);
  },

  // Lấy bài kiểm tra theo lớp học
  getExamsByClass: (classId, query = '') => {
    return apiClient.get(`/exams/class/${classId}${query}`);
  },

  // Lấy bài kiểm tra theo môn học
  getExamsBySubject: (subjectId, query = '') => {
    return apiClient.get(`/exams/subject/${subjectId}${query}`);
  },

  // Bắt đầu làm bài kiểm tra
  startExam: (examId) => {
    return apiClient.post(`/exams/${examId}/start`);
  },

  // Nộp bài kiểm tra
  submitExam: (examId, answers) => {
    return apiClient.post(`/exams/${examId}/submit`, { answers });
  },

  // Lấy kết quả bài kiểm tra
  getExamResult: (examId, studentId = null) => {
    const endpoint = studentId 
      ? `/exams/${examId}/result/${studentId}`
      : `/exams/${examId}/result`;
    return apiClient.get(endpoint);
  },

  // Lấy thống kê bài kiểm tra
  getExamStatistics: (examId) => {
    return apiClient.get(`/exams/${examId}/statistics`);
  },

  // Cập nhật trạng thái bài kiểm tra
  updateExamStatus: (examId, status) => {
    return apiClient.put(`/exams/${examId}/status`, { status });
  },

  // Sao chép bài kiểm tra
  duplicateExam: (examId, newData = {}) => {
    return apiClient.post(`/exams/${examId}/duplicate`, newData);
  },

  // Lấy danh sách học sinh đã làm bài
  getExamParticipants: (examId, query = '') => {
    return apiClient.get(`/exams/${examId}/participants${query}`);
  },

  // Chấm điểm thủ công
  manualGrading: (examId, studentId, gradeData) => {
    return apiClient.put(`/exams/${examId}/grade/${studentId}`, gradeData);
  },
};
