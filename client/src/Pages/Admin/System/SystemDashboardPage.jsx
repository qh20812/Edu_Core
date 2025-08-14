import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { useUI } from '../../../Hooks/useUI';
import { Link } from 'react-router-dom';
import {
  FaBuilding, FaUsers, FaChartLine, FaDatabase,
  FaServer, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaEye, FaCheck, FaTimes, FaSyncAlt
} from 'react-icons/fa';

const SystemDashboardPage = () => {
  const { user } = useAuth();
  const { showError } = useUI();
  
  const [dashboardData, setDashboardData] = useState({
    totalStats: {
      totalTenants: 0,
      totalUsers: 0,
      totalClasses: 0,
      totalAssignments: 0
    },
    tenantsByStatus: {
      active: 0,
      pending: 0,
      rejected: 0,
      suspended: 0
    },
    recentTenants: [],
    systemHealth: {
      status: 'unknown',
      uptime: 0,
      lastBackup: null
    },
    todayStats: {
      newRegistrations: 0,
      activeUsers: 0,
      systemErrors: 0
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Parallel API calls for better performance
      const [statsResponse, tenantsResponse, healthResponse] = await Promise.all([
        fetchSystemStats(),
        fetchRecentTenants(),
        fetchSystemHealth()
      ]);

      setDashboardData({
        totalStats: statsResponse.totalStats,
        tenantsByStatus: statsResponse.tenantsByStatus,
        todayStats: statsResponse.todayStats,
        recentTenants: tenantsResponse,
        systemHealth: healthResponse
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showError('Không thể tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Fetch system statistics
  const fetchSystemStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/system/dashboard-stats`, {
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
      console.log('Dashboard stats API not available, using mock data', err);
    }
    
    // Mock data for development
    return {
      totalStats: {
        totalTenants: 42,
        totalUsers: 1247,
        totalClasses: 186,
        totalAssignments: 834
      },
      tenantsByStatus: {
        active: 35,
        pending: 5,
        rejected: 2,
        suspended: 0
      },
      todayStats: {
        newRegistrations: 3,
        activeUsers: 89,
        systemErrors: 1
      }
    };
  };

  // Fetch recent tenants
  const fetchRecentTenants = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tenant/all?limit=5`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data?.data || data.data || [];
      }
    } catch (err) {
      console.log('Recent tenants API not available, using mock data', err);
    }
    
    // Mock data
    return [
      {
        _id: '1',
        name: 'THPT ABC',
        school_code: 'ABC001',
        status: 'pending',
        created_at: new Date(),
        contact_email: 'admin@thptabc.edu.vn'
      },
      {
        _id: '2',
        name: 'THPT XYZ',
        school_code: 'XYZ002',
        status: 'active',
        created_at: new Date(),
        contact_email: 'admin@thptxyz.edu.vn'
      }
    ];
  };

  // Fetch system health
  const fetchSystemHealth = async () => {
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
      console.log('System health API not available, using mock data', err);
    }
    
    // Mock data
    return {
      status: 'healthy',
      uptime: 8640000, // 100 days
      lastBackup: new Date(Date.now() - 3600000) // 1 hour ago
    };
  };

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadDashboardData, 300000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Chờ duyệt', icon: FaClock },
      'active': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Hoạt động', icon: FaCheckCircle },
      'rejected': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Từ chối', icon: FaTimes },
      'suspended': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'Tạm ngưng', icon: FaExclamationTriangle }
    };
    
    const config = statusConfig[status] || statusConfig['pending'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="mr-1 h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days} ngày ${hours} giờ`;
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
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Hệ thống
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Chào mừng trở lại, {user?.full_name}! Quản lý toàn bộ hệ thống EduCore
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Cập nhật: {lastUpdated.toLocaleTimeString('vi-VN')}
          </span>
          <button
            onClick={loadDashboardData}
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
            <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900">
              <FaBuilding className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng trường học</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {dashboardData?.totalStats?.totalTenants || 0}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                +{dashboardData?.todayStats?.newRegistrations || 0} hôm nay
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg dark:bg-green-900">
              <FaUsers className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng người dùng</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {dashboardData?.totalStats?.totalUsers?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {dashboardData?.todayStats?.activeUsers || 0} đang hoạt động
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg dark:bg-purple-900">
              <FaChartLine className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng lớp học</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {dashboardData?.totalStats?.totalClasses || 0}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Trên {dashboardData?.totalStats?.totalTenants || 0} trường
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg dark:bg-orange-900">
              <FaDatabase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bài tập</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {dashboardData?.totalStats?.totalAssignments || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tổng số bài tập
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trường học gần đây
            </h3>
            <Link
              to="/admin/system/tenant-management"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData?.recentTenants?.map((tenant) => (
              <div key={tenant._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FaBuilding className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {tenant.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tenant.contact_email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(tenant.status)}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(tenant.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* System Health */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tình trạng hệ thống
              </h3>
              <FaServer className={`h-5 w-5 ${
                dashboardData?.systemHealth?.status === 'healthy' ? 'text-green-500' : 'text-red-500'
              }`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</span>
                <span className={`text-sm font-medium ${
                  dashboardData?.systemHealth?.status === 'healthy' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {dashboardData?.systemHealth?.status === 'healthy' ? 'Hoạt động tốt' : 'Có vấn đề'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatUptime(dashboardData?.systemHealth?.uptime || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Backup cuối</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {dashboardData?.systemHealth?.lastBackup 
                    ? new Date(dashboardData.systemHealth.lastBackup).toLocaleTimeString('vi-VN')
                    : 'N/A'
                  }
                </span>
              </div>

              {dashboardData?.todayStats?.systemErrors > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lỗi hôm nay</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {dashboardData?.todayStats?.systemErrors || 0}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tenant Status Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thống kê trường học
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hoạt động</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {dashboardData?.tenantsByStatus?.active || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Chờ duyệt</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {dashboardData?.tenantsByStatus?.pending || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Từ chối</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {dashboardData?.tenantsByStatus?.rejected || 0}
                </span>
              </div>

              {dashboardData?.tenantsByStatus?.suspended > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tạm ngưng</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {dashboardData?.tenantsByStatus?.suspended || 0}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/system/tenant-management"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaEye className="mr-2" />
          Quản lý trường học
        </Link>

        <Link
          to="/admin/system/system-analytics"
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaChartLine className="mr-2" />
          Thống kê hệ thống
        </Link>

        <Link
          to="/admin/system/system-logs"
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaDatabase className="mr-2" />
          Nhật ký hệ thống
        </Link>

        <Link
          to="/admin/system/server-monitor"
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaServer className="mr-2" />
          Giám sát máy chủ
        </Link>
      </div>
    </div>
  );
};

export default SystemDashboardPage;
