import { apiClient } from './apiClient.service';

export const assignmentService = {
  // Lấy tất cả bài tập
  getAllAssignments: (query = '') => {
    return apiClient.get(`/assignments${query}`);
  },

  // Lấy thông tin một bài tập
  getAssignmentById: (assignmentId) => {
    return apiClient.get(`/assignments/${assignmentId}`);
  },

  // Tạo bài tập mới
  createAssignment: (assignmentData) => {
    return apiClient.post('/assignments', assignmentData);
  },

  // Cập nhật bài tập
  updateAssignment: (assignmentId, assignmentData) => {
    return apiClient.put(`/assignments/${assignmentId}`, assignmentData);
  },

  // Xóa bài tập
  deleteAssignment: (assignmentId) => {
    return apiClient.delete(`/assignments/${assignmentId}`);
  },

  // Lấy bài tập theo lớp học
  getAssignmentsByClass: (classId, query = '') => {
    return apiClient.get(`/assignments/class/${classId}${query}`);
  },

  // Lấy bài tập theo môn học
  getAssignmentsBySubject: (subjectId, query = '') => {
    return apiClient.get(`/assignments/subject/${subjectId}${query}`);
  },

  // Cập nhật trạng thái bài tập
  updateAssignmentStatus: (assignmentId, status) => {
    return apiClient.put(`/assignments/${assignmentId}/status`, { status });
  },

  // Sao chép bài tập
  duplicateAssignment: (assignmentId, newData = {}) => {
    return apiClient.post(`/assignments/${assignmentId}/duplicate`, newData);
  },

  // Gán bài tập cho lớp học
  assignToClass: (assignmentId, classIds) => {
    return apiClient.post(`/assignments/${assignmentId}/assign`, { class_ids: classIds });
  },

  // Lấy thống kê bài tập
  getAssignmentStatistics: (assignmentId) => {
    return apiClient.get(`/assignments/${assignmentId}/statistics`);
  },
};
