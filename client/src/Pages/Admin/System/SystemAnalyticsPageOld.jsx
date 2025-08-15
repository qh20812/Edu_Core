import React, { useState, useEffect, useCallback } from 'react';
import { useUI } from '../../../Hooks/useUI';
import {
  FaDatabase, FaServer, FaUsers, FaBuilding, FaChartLine,
  FaMemory, FaMicrochip, FaHdd, FaNetworkWired, FaExclamationTriangle,
  FaCheckCircle, FaClock, FaSyncAlt
} from 'react-icons/fa';

const SystemAnalyticsPage = () => {
  const { showError } = useUI();
  
  const [analytics, setAnalytics] = useState({
    systemStats: {
      totalUsers: 0,
      totalTenants: 0,
      totalClasses: 0,
      totalAssignments: 0
    },
    serverHealth: {
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0,
      uptime: 0,
      status: 'unknown'
    },
    databaseStats: {
      totalCollections: 0,
      totalDocuments: 0,
      databaseSize: 0,
      connectionCount: 0
    },
    recentActivity: []
  });
  
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Safe accessor functions
  const safeGet = (obj, path, defaultValue = 0) => {
    return path.split('.').reduce((curr, key) => curr?.[key], obj) ?? defaultValue;
  };

  const safeNum = (value, defaultValue = 0) => {
    return typeof value === 'number' ? value : defaultValue;
  };

  // Load system analytics
  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      
      // Simulate API calls for now - replace with real endpoints
      const [systemResponse, serverResponse, dbResponse, activityResponse] = await Promise.all([
        fetchSystemStats(),
        fetchServerHealth(),
        fetchDatabaseStats(),
        fetchRecentActivity()
      ]);

      setAnalytics({
        systemStats: systemResponse,
        serverHealth: serverResponse,
        databaseStats: dbResponse,
        recentActivity: activityResponse
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading analytics:', err);
      showError('Không thể tải dữ liệu thống kê hệ thống');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Simulated API calls - replace with real implementations
  const fetchSystemStats = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/system/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
    
    // Fallback mock data
    return {
      totalUsers: 1247,
      totalTenants: 42,
      totalClasses: 186,
      totalAssignments: 834
    };
  };

  const fetchServerHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/system/health`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (err) {
      console.log('Health API not available, using mock data', err);
    }
    
    // Mock data for demonstration
    return {
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      diskUsage: Math.random() * 100,
      uptime: 8640000, // 100 days in seconds
      status: 'healthy'
    };
  };

  const fetchDatabaseStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/system/database`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (err) {
      console.log('Database API not available, using mock data', err);
    }
    
    // Mock data
    return {
      totalCollections: 15,
      totalDocuments: 15678,
      databaseSize: 245.8, // MB
      connectionCount: 12
    };
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/system/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (err) {
      console.log('Activity API not available, using mock data', err);
    }
    
    // Mock data
    return [
      { id: 1, type: 'tenant_registered', description: 'Trường THPT ABC đã đăng ký', timestamp: new Date() },
      { id: 2, type: 'user_login', description: '15 người dùng đăng nhập trong 1 giờ qua', timestamp: new Date() },
      { id: 3, type: 'system_backup', description: 'Sao lưu dữ liệu tự động hoàn thành', timestamp: new Date() }
    ];
  };

  useEffect(() => {
    loadAnalytics();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, [loadAnalytics]);

  const getHealthStatus = (value, type = 'cpu') => {
    if (type === 'status') {
      return value === 'healthy' ? 'success' : 'error';
    }
    
    if (value < 50) return 'success';
    if (value < 80) return 'warning';
    return 'error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <FaExclamationTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FaClock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Thống kê hệ thống
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Giám sát tình trạng và hiệu suất hệ thống EduCore
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Cập nhật lần cuối: {lastUpdated.toLocaleTimeString('vi-VN')}
          </span>
          <button
            onClick={loadAnalytics}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaSyncAlt className="mr-2" />
            Làm mới
          </button>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng người dùng</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {(analytics?.systemStats?.totalUsers || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
              <FaBuilding className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng trường học</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {safeNum(analytics?.systemStats?.totalTenants).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <FaUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng lớp học</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {safeNum(analytics?.systemStats?.totalClasses).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
              <FaChartLine className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng bài tập</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {safeNum(analytics?.systemStats?.totalAssignments).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Server Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tình trạng máy chủ
            </h3>
            {getStatusIcon(getHealthStatus(analytics?.serverHealth?.status || 'unknown', 'status'))}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <FaMicrochip className="mr-2" />
                  CPU Usage
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeNum(analytics?.serverHealth?.cpuUsage).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getHealthStatus(analytics.serverHealth.cpuUsage) === 'success' ? 'bg-green-500' :
                    getHealthStatus(analytics.serverHealth.cpuUsage) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analytics.serverHealth.cpuUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <FaMemory className="mr-2" />
                  Memory Usage
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analytics.serverHealth.memoryUsage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getHealthStatus(analytics.serverHealth.memoryUsage) === 'success' ? 'bg-green-500' :
                    getHealthStatus(analytics.serverHealth.memoryUsage) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analytics.serverHealth.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <FaHdd className="mr-2" />
                  Disk Usage
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analytics.serverHealth.diskUsage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getHealthStatus(analytics.serverHealth.diskUsage) === 'success' ? 'bg-green-500' :
                    getHealthStatus(analytics.serverHealth.diskUsage) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analytics.serverHealth.diskUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <FaServer className="mr-2" />
                  Uptime
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatUptime(analytics.serverHealth.uptime)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thống kê Database
            </h3>
            <FaDatabase className="h-5 w-5 text-blue-500" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Collections
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {analytics.databaseStats.totalCollections}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Documents
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {(analytics?.databaseStats?.totalDocuments || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Database Size
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatBytes(analytics.databaseStats.databaseSize * 1024 * 1024)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <FaNetworkWired className="mr-2" />
                Active Connections
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {analytics.databaseStats.connectionCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hoạt động gần đây
        </h3>

        <div className="space-y-3">
          {analytics.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.description}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activity.timestamp.toLocaleTimeString('vi-VN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemAnalyticsPage;
