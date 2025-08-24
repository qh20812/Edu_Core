import { apiClient } from './apiClient.service';

export const tenantService = {
  // Lấy thông tin tenant hiện tại
  getCurrentTenant: () => {
    return apiClient.get('/tenants/current');
  },

  // Đăng ký tenant mới (trường học mới) với thông tin plan
  registerTenant: (tenantData) => {
    return apiClient.post('/tenant/register', tenantData);
  },

  // Đăng ký tenant với plan từ pricing page
  registerTenantWithPlan: (tenantInfo, adminInfo, planInfo) => {
    return apiClient.post('/tenant/register', {
      tenantInfo,
      adminInfo,
      planInfo
    });
  },

  // Cập nhật thông tin tenant
  updateTenant: (tenantData) => {
    return apiClient.put('/tenants/current', tenantData);
  },

  // Lấy cài đặt tenant
  getTenantSettings: () => {
    return apiClient.get('/tenants/settings');
  },

  // Cập nhật cài đặt tenant
  updateTenantSettings: (settings) => {
    return apiClient.put('/tenants/settings', settings);
  },

  // Upload logo trường
  uploadLogo: (formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/tenants/logo`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(response => response.json());
  },

  // Lấy thống kê tenant
  getTenantStatistics: () => {
    return apiClient.get('/tenants/statistics');
  },

  // Lấy danh sách môn học của tenant
  getTenantSubjects: () => {
    return apiClient.get('/tenants/subjects');
  },

  // Cập nhật danh sách môn học
  updateTenantSubjects: (subjects) => {
    return apiClient.put('/tenants/subjects', { subjects });
  },

  // Cấu hình email
  configureEmail: (emailConfig) => {
    return apiClient.put('/tenants/email-config', emailConfig);
  },

  // Test cấu hình email
  testEmailConfig: () => {
    return apiClient.post('/tenants/test-email');
  },

  // Backup dữ liệu
  backupData: () => {
    return apiClient.post('/tenants/backup');
  },

  // Restore dữ liệu
  restoreData: (formData) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/tenants/restore`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(response => response.json());
  },
};
