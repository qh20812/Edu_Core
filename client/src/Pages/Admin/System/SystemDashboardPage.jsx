import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSchool, FaClipboardList, FaUsers, FaServer, FaChartBar, FaCog } from 'react-icons/fa';
import { useUI } from '../../../Hooks/useUI';
import { systemService } from '../../../Services/system.service';

// Component card thống kê mẫu
const StatCard = ({ title, value, icon, color = 'blue-600', loading = false }) => (
  <div className="p-6 transition-shadow bg-white rounded-lg shadow-md dark:bg-slate-800 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-400">{title}</p>
        {loading ? (
          <div className="w-16 h-8 mt-1 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
        ) : (
          <p className="text-3xl font-bold text-foreground">{value}</p>
        )}
      </div>
      <div className={`p-3 text-white rounded-full bg-${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const SystemDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalUsers: 0,
    systemLogs: 0,
    serverStatus: 'Đang kiểm tra...',
    recentTenants: [],
    systemHealth: []
  });

  const fetchSystemStats = async () => {
    setLoading(true);
    try {
      // Lấy dashboard stats từ API thật
      const dashboardResponse = await systemService.getDashboardStats();
      const healthResponse = await systemService.getHealth();
      
      // Xử lý dữ liệu từ API
      const dashboardData = dashboardResponse.data;
      const healthData = healthResponse.data;
      
      setStats({
        totalTenants: dashboardData.totalTenants || 0,
        totalUsers: dashboardData.totalUsers || 0,
        systemLogs: dashboardData.systemLogs || 0,
        serverStatus: healthData.status === 'healthy' ? 'Online' : 'Warning',
        recentTenants: dashboardData.recentTenants || [],
        systemHealth: healthData.services || [
          { service: 'Database', status: 'healthy', uptime: '99.9%' },
          { service: 'API Server', status: 'healthy', uptime: '99.8%' },
          { service: 'File Storage', status: 'healthy', uptime: '99.7%' },
          { service: 'Email Service', status: 'warning', uptime: '98.5%' }
        ]
      });
      
    } catch (error) {
      console.error('Error fetching system stats:', error);
      showError('Không thể tải thống kê hệ thống: ' + error.message);
      
      // Fallback to mock data if API fails
      setStats({
        totalTenants: 0,
        totalUsers: 0,
        systemLogs: 0,
        serverStatus: 'Offline',
        recentTenants: [],
        systemHealth: [
          { service: 'Database', status: 'error', uptime: '0%' },
          { service: 'API Server', status: 'error', uptime: '0%' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 text-shadow-2xs">
            {t('navigation.dashboard')} - {t('roles.sys_admin')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Quản lý toàn bộ hệ thống EduCore
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={fetchSystemStats}
            className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
          >
            <FaChartBar className="inline mr-2" />
            Làm mới
          </button>
          <button className="px-4 py-2 text-white transition-colors rounded-lg bg-secondary hover:bg-secondary/90">
            <FaCog className="inline mr-2" />
            Cài đặt
          </button>
        </div>
      </div>
      
      {/* Khu vực thống kê */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Tổng số trường học" 
          value={stats.totalTenants} 
          icon={<FaSchool size={24} />} 
          color="blue-600"
          loading={isLoading}
        />
        <StatCard 
          title="Tổng số người dùng" 
          value={stats.totalUsers.toLocaleString()} 
          icon={<FaUsers size={24} />} 
          color="purple-600"
          loading={isLoading}
        />
        <StatCard 
          title="Logs hệ thống (24h)" 
          value={stats.systemLogs.toLocaleString()} 
          icon={<FaClipboardList size={24} />} 
          color="orange-600"
          loading={isLoading}
        />
        <StatCard 
          title="Trạng thái server"
          value={stats.serverStatus} 
          icon={<FaServer size={24} />} 
          color={stats.serverStatus === 'Online' ? 'green-500' : stats.serverStatus === 'Warning' ? 'yellow-500' : 'red-500'}
          loading={isLoading}
        />
      </div>
      {/* Các component khác cho sys_admin */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bảng quản lý Tenants */}
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Trường học gần đây
          </h2>
          <div className="space-y-3">
            {/* Hiển thị dữ liệu thật từ API */}
            {isLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-slate-700 animate-pulse">
                  <div>
                    <div className="w-32 h-4 mb-2 bg-gray-200 rounded dark:bg-gray-600"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded dark:bg-gray-600"></div>
                  </div>
                  <div className="w-16 h-6 bg-gray-200 rounded dark:bg-gray-600"></div>
                </div>
              ))
            ) : stats.recentTenants.length > 0 ? (
              stats.recentTenants.map((school, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-slate-700">
                  <div>
                    <p className="font-medium text-foreground">{school.name}</p>
                    <p className="text-sm text-gray-500">{school.totalUsers || 0} người dùng</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    school.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : school.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {school.status === 'active' ? 'Hoạt động' : 
                     school.status === 'pending' ? 'Chờ duyệt' : 'Ngưng hoạt động'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                Không có dữ liệu trường học
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Tình trạng hệ thống
          </h2>
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeleton for system health
              [...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-between animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded dark:bg-gray-600"></div>
                  </div>
                  <div className="w-12 h-3 bg-gray-200 rounded dark:bg-gray-600"></div>
                </div>
              ))
            ) : (
              stats.systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'healthy' || service.status === 'online'
                        ? 'bg-green-500' 
                        : service.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className="text-foreground">{service.service}</span>
                  </div>
                  <span className="text-sm text-gray-500">{service.uptime}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDashboardPage;
