import { apiClient } from '../Lib/apiClient';

// Auth Service Functions
export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  // Get current user info
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await apiClient.post('/api/auth/logout');
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await apiClient.get('/api/auth/verify');
    return response.data;
  }
};

// Tenant Service Functions
export const tenantService = {
  // Register new tenant
  register: async (tenantData) => {
    const response = await apiClient.post('/api/tenants/register', tenantData);
    return response.data;
  },

  // Get all tenants (sys_admin only)
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/tenants/all?${params}`);
    return response.data;
  },

  // Get tenant by ID
  getById: async (tenantId) => {
    const response = await apiClient.get(`/api/tenants/${tenantId}`);
    return response.data;
  },

  // Approve tenant
  approve: async (tenantId) => {
    const response = await apiClient.put(`/api/tenants/${tenantId}/approve`);
    return response.data;
  },

  // Reject tenant
  reject: async (tenantId, reason) => {
    const response = await apiClient.put(`/api/tenants/${tenantId}/reject`, { reason });
    return response.data;
  },

  // Update tenant subscription
  updateSubscription: async (tenantId, subscriptionData) => {
    const response = await apiClient.put(`/api/tenants/${tenantId}/subscription`, subscriptionData);
    return response.data;
  }
};

// User Service Functions
export const userService = {
  // Get all users
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/users?${params}`);
    return response.data;
  },

  // Get user by ID
  getById: async (userId) => {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data;
  },

  // Create new user
  create: async (userData) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  },

  // Update user
  update: async (userId, userData) => {
    const response = await apiClient.put(`/api/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (userId) => {
    const response = await apiClient.delete(`/api/users/${userId}`);
    return response.data;
  },

  // Get users by tenant
  getByTenant: async (tenantId, filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/users/tenant/${tenantId}?${params}`);
    return response.data;
  },

  // Update user status
  updateStatus: async (userId, status) => {
    const response = await apiClient.put(`/api/users/${userId}/status`, { status });
    return response.data;
  }
};

// Class Service Functions
export const classService = {
  // Get all classes
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/classes?${params}`);
    return response.data;
  },

  // Get class by ID
  getById: async (classId) => {
    const response = await apiClient.get(`/api/classes/${classId}`);
    return response.data;
  },

  // Create new class
  create: async (classData) => {
    const response = await apiClient.post('/api/classes', classData);
    return response.data;
  },

  // Update class
  update: async (classId, classData) => {
    const response = await apiClient.put(`/api/classes/${classId}`, classData);
    return response.data;
  },

  // Delete class
  delete: async (classId) => {
    const response = await apiClient.delete(`/api/classes/${classId}`);
    return response.data;
  },

  // Get students in class
  getStudents: async (classId) => {
    const response = await apiClient.get(`/api/classes/${classId}/students`);
    return response.data;
  },

  // Get teachers in class
  getTeachers: async (classId) => {
    const response = await apiClient.get(`/api/classes/${classId}/teachers`);
    return response.data;
  },

  // Add student to class
  addStudent: async (classId, studentId) => {
    const response = await apiClient.post(`/api/classes/${classId}/students`, { studentId });
    return response.data;
  },

  // Remove student from class
  removeStudent: async (classId, studentId) => {
    const response = await apiClient.delete(`/api/classes/${classId}/students/${studentId}`);
    return response.data;
  }
};

// Assignment Service Functions
export const assignmentService = {
  // Get all assignments
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/assignments?${params}`);
    return response.data;
  },

  // Get assignment by ID
  getById: async (assignmentId) => {
    const response = await apiClient.get(`/api/assignments/${assignmentId}`);
    return response.data;
  },

  // Create new assignment
  create: async (assignmentData) => {
    const response = await apiClient.post('/api/assignments', assignmentData);
    return response.data;
  },

  // Update assignment
  update: async (assignmentId, assignmentData) => {
    const response = await apiClient.put(`/api/assignments/${assignmentId}`, assignmentData);
    return response.data;
  },

  // Delete assignment
  delete: async (assignmentId) => {
    const response = await apiClient.delete(`/api/assignments/${assignmentId}`);
    return response.data;
  },

  // Get assignments by class
  getByClass: async (classId, filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/assignments/class/${classId}?${params}`);
    return response.data;
  },

  // Get submissions for assignment
  getSubmissions: async (assignmentId) => {
    const response = await apiClient.get(`/api/assignments/${assignmentId}/submissions`);
    return response.data;
  }
};

// System Service Functions
export const systemService = {
  // Get system analytics
  getAnalytics: async () => {
    const response = await apiClient.get('/api/system/analytics');
    return response.data;
  },

  // Get system health
  getHealth: async () => {
    const response = await apiClient.get('/api/system/health');
    return response.data;
  },

  // Get system logs
  getLogs: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/api/system/logs?${params}`);
    return response.data;
  },

  // Get database stats
  getDatabaseStats: async () => {
    const response = await apiClient.get('/api/system/database-stats');
    return response.data;
  }
};

// Export all services
export const apiServices = {
  auth: authService,
  tenant: tenantService,
  user: userService,
  class: classService,
  assignment: assignmentService,
  system: systemService
};

export default apiServices;
