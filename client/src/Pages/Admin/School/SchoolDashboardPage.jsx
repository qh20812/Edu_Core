import React from 'react';
import { useAuth } from '../../../Hooks/useAuthQueries';
import { FaSchool, FaUsers, FaChalkboardTeacher, FaBookOpen, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const SchoolDashboardPage = () => {
  const { user } = useAuth();

  // Mock data - replace with real API calls later
  const dashboardStats = {
    totalStudents: 850,
    totalTeachers: 45,
    totalClasses: 28,
    activeAssignments: 15,
    upcomingExams: 8,
    recentActivities: [
      { id: 1, type: 'assignment', message: 'Bài tập Toán học đã được tạo', time: '2 giờ trước' },
      { id: 2, type: 'student', message: '5 học sinh mới đăng ký', time: '4 giờ trước' },
      { id: 3, type: 'exam', message: 'Kiểm tra Văn học đã được lên lịch', time: '1 ngày trước' },
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          School Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Chào mừng {user?.full_name || 'Admin'} quay trở lại! Tổng quan về trường học của bạn.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Học sinh</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dashboardStats.totalStudents.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số học sinh</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaChalkboardTeacher className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Giáo viên</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {dashboardStats.totalTeachers}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số giáo viên</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaSchool className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lớp học</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {dashboardStats.totalClasses}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lớp đang hoạt động</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <FaBookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bài tập</h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {dashboardStats.activeAssignments}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Đang hoạt động</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <FaCalendarAlt className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kiểm tra</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {dashboardStats.upcomingExams}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sắp diễn ra</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <FaChartLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hiệu suất</h3>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                92%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Điểm trung bình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            {dashboardStats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Xem tất cả hoạt động →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Thao tác nhanh
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Quản lý học sinh
              </span>
            </button>
            
            <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaChalkboardTeacher className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Quản lý giáo viên
              </span>
            </button>
            
            <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaSchool className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Quản lý lớp học
              </span>
            </button>
            
            <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaBookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Tạo bài tập
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboardPage;
