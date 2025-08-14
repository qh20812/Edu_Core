import apiClient from '../Lib/apiClient';

export const notificationService = {
  // Lấy danh sách thông báo
  getNotifications: async (page = 1, limit = 20) => {
    const response = await apiClient.get('/notifications', {
      params: { page, limit }
    });
    return response.data;
  },

  // Lấy số lượng thông báo chưa đọc
  getUnreadCount: async () => {
    const response = await apiClient.get('/notifications/unread-count');
    return response.data;
  },

  // Đánh dấu thông báo đã đọc
  markAsRead: async (notificationId) => {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Đánh dấu tất cả thông báo đã đọc
  markAllAsRead: async () => {
    const response = await apiClient.patch('/notifications/mark-all-read');
    return response.data;
  },

  // Xóa thông báo
  deleteNotification: async (notificationId) => {
    const response = await apiClient.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  // Xóa tất cả thông báo đã đọc
  deleteAllRead: async () => {
    const response = await apiClient.delete('/notifications/read');
    return response.data;
  },

  // Tạo thông báo mới (admin)
  createNotification: async (notificationData) => {
    const response = await apiClient.post('/notifications', notificationData);
    return response.data;
  }
};

export default notificationService;
