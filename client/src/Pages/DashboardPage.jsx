import React from 'react';
import { useAuth } from '../Hooks/useAuthQueries';

// Import các trang dashboard cụ thể cho từng vai trò
import SystemDashboardPage from './Admin/System/SystemDashboardPage';
import SchoolDashboardPage from './Admin/School/SchoolDashboardPage';
import TeacherDashboardPage from './Teacher/TeacherDashboardPage';
import StudentDashboardPage from './Student/StudentDashboardPage';

const DashboardPage = () => {
  const { user } = useAuth();

  // Dựa vào vai trò của user để render dashboard tương ứng
  switch (user?.role) {
    case 'sys_admin':
      return <SystemDashboardPage />;
    case 'school_admin':
    case 'admin':
      return <SchoolDashboardPage />;
    case 'teacher':
      return <TeacherDashboardPage />;
    case 'student':
      return <StudentDashboardPage />;
    case 'parent':
      // Parent có thể xem dashboard của student (con em mình)
      return <StudentDashboardPage />;
    default:
      // Fallback cho các vai trò khác hoặc khi không xác định được
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-600 dark:text-gray-300">
              Chào mừng đến với EduCore!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Hệ thống đang xác định quyền truy cập của bạn...
            </p>
          </div>
        </div>
      );
  }
};

export default DashboardPage;
