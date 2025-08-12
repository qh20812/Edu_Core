import { apiClient } from './apiClient.service';

export const classService = {
  // Lấy tất cả lớp học
  getAllClasses: (query = '') => {
    return apiClient.get(`/classes${query}`);
  },

  // Lấy thông tin một lớp học
  getClassById: (classId) => {
    return apiClient.get(`/classes/${classId}`);
  },

  // Tạo lớp học mới
  createClass: (classData) => {
    return apiClient.post('/classes', classData);
  },

  // Cập nhật thông tin lớp học
  updateClass: (classId, classData) => {
    return apiClient.put(`/classes/${classId}`, classData);
  },

  // Xóa lớp học
  deleteClass: (classId) => {
    return apiClient.delete(`/classes/${classId}`);
  },

  // Lấy danh sách học sinh trong lớp
  getStudentsInClass: (classId, query = '') => {
    return apiClient.get(`/classes/${classId}/students${query}`);
  },

  // Thêm học sinh vào lớp
  addStudentToClass: (classId, studentId) => {
    return apiClient.post(`/classes/${classId}/students`, { student_id: studentId });
  },

  // Xóa học sinh khỏi lớp
  removeStudentFromClass: (classId, studentId) => {
    return apiClient.delete(`/classes/${classId}/students/${studentId}`);
  },

  // Lấy thống kê lớp học
  getClassStatistics: (classId) => {
    return apiClient.get(`/classes/${classId}/statistics`);
  },

  // Lấy lịch học của lớp
  getClassSchedule: (classId) => {
    return apiClient.get(`/classes/${classId}/schedule`);
  },

  // Cập nhật trạng thái lớp học
  updateClassStatus: (classId, status) => {
    return apiClient.put(`/classes/${classId}/status`, { status });
  },
};
