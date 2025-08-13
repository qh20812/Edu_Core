import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

// Layouts
import DashboardLayout from '../Components/Layouts/DashboardLayout';

// Auth Pages
import LoginPage from '../Pages/Auth/LoginPage';
import RegisterPage from '../Pages/Auth/RegisterPage';
import TenantRegisterPage from '../Pages/Auth/TenantRegisterPageNew';
import TenantRegistrationSuccessPage from '../Pages/Auth/TenantRegistrationSuccessPage';

// Public Pages
import LandingPage from '../Pages/Landing/LandingPage';
import AboutPage from '../Pages/Landing/AboutPage';
import BlogPage from '../Pages/Landing/BlogPage';
import CTPage from '../Pages/Landing/ContactPage';

// Dashboard Pages
import DashboardPage from '../Pages/DashboardPage';

// Feature Pages
import ClassesPage from '../Pages/ClassesPage';
import AssignmentsPage from '../Pages/AssignmentsPage';
import ExamsPage from '../Pages/ExamsPage';

// Detail Pages (to be implemented)
// import ClassDetailPage from '../Pages/ClassDetailPage';
// import AssignmentDetailPage from '../Pages/AssignmentDetailPage';
// import ExamDetailPage from '../Pages/ExamDetailPage';

// User Pages (to be implemented)
// import UsersPage from '../Pages/UsersPage';
// import ProfilePage from '../Pages/ProfilePage';

// Component bảo vệ các route yêu cầu đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Component cho các route public (VD: trang login, nếu đã đăng nhập thì redirect)
const PublicRoute = ({ children, redirectToDashboard = true }) => {
  const { isLoggedIn } = useAuth();
  
  if (isLoggedIn && redirectToDashboard) {
    return <Navigate to="/dashboard/" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền admin
const AdminRoute = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin' && user?.role !== 'sys_admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền giáo viên trở lên
const TeacherRoute = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!['teacher', 'admin', 'sys_admin'].includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  const { loading } = useAuth();

  // Hiển thị màn hình chờ trong khi xác thực token
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
          <p>Đang khởi tạo ứng dụng...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Không cần auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<CTPage />} />
        
        {/* Tenant Registration Routes */}
        <Route 
          path="/tenant-register" 
          element={<TenantRegisterPage />} 
        />
        <Route 
          path="/tenant-registration-success" 
          element={<TenantRegistrationSuccessPage />} 
        />
        
        {/* Auth Routes - Redirect nếu đã đăng nhập */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        {/* Protected Routes (yêu cầu đăng nhập) */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Trang mặc định */}
          <Route index element={<DashboardPage />} />
          
          {/* Classes Routes */}
          <Route path="classes" element={<ClassesPage />} />
          {/* <Route path="classes/:id" element={<ClassDetailPage />} /> */}
          
          {/* Assignments Routes */}
          <Route path="assignments" element={<AssignmentsPage />} />
          {/* <Route path="assignments/:id" element={<AssignmentDetailPage />} /> */}
          
          {/* Exams Routes */}
          <Route path="exams" element={<ExamsPage />} />
          {/* <Route path="exams/:id" element={<ExamDetailPage />} /> */}
          
          {/* User Management Routes (Admin only) */}
          {/* <Route 
            path="users" 
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            } 
          /> */}
          
          {/* Profile Route */}
          {/* <Route path="profile" element={<ProfilePage />} /> */}
        </Route>

        {/* Redirect /dashboard to /dashboard/ */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard/" replace />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-400">404</h1>
                <p className="text-gray-600 dark:text-gray-300">Trang không tồn tại</p>
                <button 
                  onClick={() => window.history.back()}
                  className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Quay lại
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
