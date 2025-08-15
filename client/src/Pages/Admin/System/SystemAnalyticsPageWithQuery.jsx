import React from 'react';
import { useSystemAnalytics, useSystemHealth } from '../../Hooks/useSystemQueries';
import { Loader2, AlertCircle, TrendingUp, Users, School, Activity } from 'lucide-react';

const SystemAnalyticsPageWithQuery = () => {
  // Sử dụng TanStack Query hooks
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics
  } = useSystemAnalytics();

  const {
    data: health,
    isLoading: healthLoading,
    error: healthError
  } = useSystemHealth();

  // Safe number formatter
  const safeNum = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Safe percentage formatter
  const safePercent = (value, total) => {
    if (!value || !total) return 0;
    return Math.round((safeNum(value) / safeNum(total)) * 100);
  };

  // Loading state
  if (analyticsLoading || healthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-gray-600">Đang tải dữ liệu hệ thống...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (analyticsError || healthError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
          <p className="mt-2 text-red-600">Lỗi tải dữ liệu hệ thống</p>
          <button
            onClick={() => {
              refetchAnalytics();
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Safe data extraction
  const analyticsData = analytics?.data || {};
  const healthData = health?.data || {};

  const {
    totalTenants = 0,
    totalUsers = 0,
    totalActiveUsers = 0,
    totalStudents = 0,
    totalTeachers = 0,
    tenantsByStatus = {},
    recentActivities = []
  } = analyticsData;

  const {
    uptime = 0,
    memoryUsage = {},
    cpuUsage = 0
  } = healthData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
        <p className="text-gray-600">Tổng quan về tình trạng hệ thống</p>
      </div>

      {/* Server Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Server Uptime</h3>
              <p className="text-2xl font-bold text-green-600">
                {safeNum(uptime)} giờ
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">CPU Usage</h3>
              <p className="text-2xl font-bold text-blue-600">
                {safeNum(cpuUsage, 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Memory Used</h3>
              <p className="text-2xl font-bold text-orange-600">
                {safeNum(memoryUsage?.used, 0)} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <School className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Tổng số trường</h3>
              <p className="text-2xl font-bold text-blue-600">
                {safeNum(totalTenants).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Tổng người dùng</h3>
              <p className="text-2xl font-bold text-green-600">
                {safeNum(totalUsers).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Học sinh</h3>
              <p className="text-2xl font-bold text-purple-600">
                {safeNum(totalStudents).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Giáo viên</h3>
              <p className="text-2xl font-bold text-orange-600">
                {safeNum(totalTeachers).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Users and Tenant Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Người dùng hoạt động</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Tổng số người dùng:</span>
              <span className="font-semibold">{safeNum(totalUsers).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Đang hoạt động:</span>
              <span className="font-semibold text-green-600">
                {safeNum(totalActiveUsers).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tỷ lệ hoạt động:</span>
              <span className="font-semibold text-blue-600">
                {safePercent(totalActiveUsers, totalUsers)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái trường học</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Đã duyệt:</span>
              <span className="font-semibold text-green-600">
                {safeNum(tenantsByStatus?.approved).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Chờ duyệt:</span>
              <span className="font-semibold text-yellow-600">
                {safeNum(tenantsByStatus?.pending).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Từ chối:</span>
              <span className="font-semibold text-red-600">
                {safeNum(tenantsByStatus?.rejected).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
        {Array.isArray(recentActivities) && recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.slice(0, 10).map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{activity.type || 'Unknown Activity'}</p>
                  <p className="text-sm text-gray-600">
                    {activity.description || 'No description available'}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleString('vi-VN') : 'Unknown time'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có hoạt động gần đây</p>
        )}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => refetchAnalytics()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Làm mới dữ liệu
        </button>
      </div>
    </div>
  );
};

export default SystemAnalyticsPageWithQuery;
