import { apiClient } from './apiClient.service';

export const userService = {
  // Lấy tất cả người dùng
  getAllUsers: (query = '') => {
    return apiClient.get(`/users${query}`);
  },

  // Lấy thông tin một người dùng
  getUserById: (userId) => {
    return apiClient.get(`/users/${userId}`);
  },

  // Tạo người dùng mới
  createUser: (userData) => {
    return apiClient.post('/users', userData);
  },

  // Cập nhật thông tin người dùng
  updateUser: (userId, userData) => {
    return apiClient.put(`/users/${userId}`, userData);
  },

  // Xóa người dùng
  deleteUser: (userId) => {
    return apiClient.delete(`/users/${userId}`);
  },

  // Cập nhật hồ sơ cá nhân
  updateProfile: (profileData) => {
    return apiClient.put('/users/profile', profileData);
  },

  // Upload avatar
  uploadAvatar: (formData) => {
    // Đặc biệt: không set Content-Type cho FormData
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/avatar`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(response => response.json());
  },

  // Lấy danh sách học sinh
  getStudents: (query = '') => {
    return apiClient.get(`/users?role=student${query}`);
  },

  // Lấy danh sách giáo viên
  getTeachers: (query = '') => {
    return apiClient.get(`/users?role=teacher${query}`);
  },

  // Lấy danh sách phụ huynh
  getParents: (query = '') => {
    return apiClient.get(`/users?role=parent${query}`);
  },

  // Cập nhật trạng thái người dùng
  updateUserStatus: (userId, status) => {
    return apiClient.put(`/users/${userId}/status`, { status });
  },

  // Reset mật khẩu cho người dùng (admin only)
  resetUserPassword: (userId) => {
    return apiClient.post(`/users/${userId}/reset-password`);
  },
};
