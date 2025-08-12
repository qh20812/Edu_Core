import { apiClient } from './apiClient.service';

export const authService = {
  login: (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  getMe: () => {
    return apiClient.get('/auth/me');
  },

  logout: () => {
    // Backend của bạn có endpoint logout, chúng ta sẽ gọi nó
    return apiClient.post('/auth/logout');
  },

  // Làm mới token
  refreshToken: () => {
    return apiClient.post('/auth/refresh');
  },

  // Quên mật khẩu
  forgotPassword: (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Đặt lại mật khẩu
  resetPassword: (token, newPassword) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },

  // Thay đổi mật khẩu
  changePassword: (currentPassword, newPassword) => {
    return apiClient.put('/auth/change-password', { currentPassword, newPassword });
  },

  // Xác nhận email
  verifyEmail: (token) => {
    return apiClient.post('/auth/verify-email', { token });
  },

  // Gửi lại email xác nhận
  resendVerification: (email) => {
    return apiClient.post('/auth/resend-verification', { email });
  },
};
