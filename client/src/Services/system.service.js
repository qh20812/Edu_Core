import { apiClient } from './apiClient.service';

/**
 * System Service - Tập trung tất cả API calls liên quan đến system
 * Thay thế các direct fetch calls trong components
 */

export const systemService = {
  /**
   * Lấy system analytics
   */
  getAnalytics: async () => {
    try {
      const response = await apiClient.get('/system/analytics');
      return response;
    } catch (error) {
      console.error('Error fetching system analytics:', error);
      throw error;
    }
  },

  /**
   * Lấy system health status
   */
  getHealth: async () => {
    try {
      const response = await apiClient.get('/system/health');
      return response;
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  },

  /**
   * Lấy database stats
   */
  getDatabaseStats: async () => {
    try {
      const response = await apiClient.get('/system/database');
      return response;
    } catch (error) {
      console.error('Error fetching database stats:', error);
      throw error;
    }
  },

  /**
   * Lấy system activity logs
   */
  getActivityLogs: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const endpoint = params ? `/system/activity?${params}` : '/system/activity';
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },

  /**
   * Lấy system logs với pagination
   */
  getLogs: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const endpoint = params ? `/system/logs?${params}` : '/system/logs';
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching system logs:', error);
      throw error;
    }
  },

  /**
   * Backup database
   */
  backupDatabase: async () => {
    try {
      const response = await apiClient.post('/system/backup');
      return response;
    } catch (error) {
      console.error('Error backing up database:', error);
      throw error;
    }
  },

  /**
   * Clear cache
   */
  clearCache: async () => {
    try {
      const response = await apiClient.post('/system/cache/clear');
      return response;
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  },

  /**
   * Restart system service
   */
  restartService: async (serviceName) => {
    try {
      const response = await apiClient.post(`/system/restart/${serviceName}`);
      return response;
    } catch (error) {
      console.error(`Error restarting service ${serviceName}:`, error);
      throw error;
    }
  },

  /**
   * Get system configuration
   */
  getConfiguration: async () => {
    try {
      const response = await apiClient.get('/system/config');
      return response;
    } catch (error) {
      console.error('Error fetching system configuration:', error);
      throw error;
    }
  },

  /**
   * Update system configuration
   */
  updateConfiguration: async (config) => {
    try {
      const response = await apiClient.put('/system/config', config);
      return response;
    } catch (error) {
      console.error('Error updating system configuration:', error);
      throw error;
    }
  }
};

export default systemService;
