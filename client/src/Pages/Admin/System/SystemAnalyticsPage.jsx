import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaBuilding,
  FaClipboard,
  FaServer,
  FaHistory,
  FaSync,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle
} from "react-icons/fa";
import { useUI } from "../../../Hooks/useUI";
import { useSystemOverview } from "../../../Hooks/useSystemData";
import Button from "../../../Components/UI/Button";
import SectionCard from "../../../Components/UI/SectionCard";

const SystemAnalyticsPage = () => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useUI();
  
  // Use React Query hooks instead of useState and useEffect
  const { analytics, health, databaseStats, isLoading, isError, error, refetchAll } = useSystemOverview();
  
  const [refreshing, setRefreshing] = useState(false);

  // Safe accessor functions
  const safeNum = (value, defaultValue = 0) => {
    return typeof value === 'number' ? value : defaultValue;
  };

  // Format uptime
  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
      case 'healthy':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'danger':
      case 'error':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAll();
      showSuccess('Dữ liệu đã được cập nhật');
    } catch (err) {
      showError('Lỗi khi tải dữ liệu: ' + err.message);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaTimesCircle className="w-12 h-12 mx-auto text-red-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Lỗi tải dữ liệu analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || 'Có lỗi xảy ra khi tải dữ liệu hệ thống'}
          </p>
          <Button onClick={handleRefresh} variant="primary">
            <FaSync className="inline mr-2" />
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  // Extract data safely from React Query responses
  const systemStats = analytics?.data?.data?.systemStats || {
    totalUsers: 0,
    totalTenants: 0,
    totalClasses: 0,
    totalAssignments: 0
  };

  const serverHealth = health?.data?.data || {
    status: 'unknown',
    uptime: 0
  };

  const dbStats = databaseStats?.data?.data || {
    totalCollections: 0,
    totalDocuments: 0,
    connectionCount: 0
  };

  const recentActivity = analytics?.data?.data?.recentActivity || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            {t("navigation.systemAnalytics")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Theo dõi hiệu suất và thống kê hệ thống
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleRefresh} variant="accent" disabled={isLoading || refreshing}>
            <FaSync className={`inline mr-2 ${isLoading || refreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải dữ liệu analytics...</p>
        </div>
      ) : (
        <>
          {/* Last Updated */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Dữ liệu được cập nhật tự động
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                  <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng người dùng</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {safeNum(systemStats?.totalUsers).toLocaleString()}
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
                    {safeNum(systemStats?.totalTenants).toLocaleString()}
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
                    {safeNum(systemStats?.totalClasses).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                  <FaClipboard className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng bài tập</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {safeNum(systemStats?.totalAssignments).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Server Health */}
          <SectionCard
            title="Sức khỏe hệ thống"
            subtitle="Trạng thái server và cơ sở dữ liệu"
            icon={<FaServer size={20} className="text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Server Status</h4>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(serverHealth?.status)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status: {serverHealth?.status || 'Unknown'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Uptime: {formatUptime(safeNum(serverHealth?.uptime))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Database Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Collections:</span>
                    <span className="text-gray-900 dark:text-white">{safeNum(dbStats?.totalCollections)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                    <span className="text-gray-900 dark:text-white">{safeNum(dbStats?.totalDocuments).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Connections:</span>
                    <span className="text-gray-900 dark:text-white">{safeNum(dbStats?.connectionCount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Hoạt động gần đây"
            subtitle="Các sự kiện hệ thống mới nhất"
            icon={<FaHistory size={20} className="text-blue-600" />}
          >
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-shrink-0">
                      <FaHistory className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action || 'Unknown action'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp || 'Unknown time'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <FaHistory size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Chưa có hoạt động nào</p>
                </div>
              )}
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
};

export default SystemAnalyticsPage;
