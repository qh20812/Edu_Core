import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuthQueries';

// Layouts
import DashboardLayout from '../Components/Layouts/DashboardLayout';

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Lazy load components for code splitting
// Auth Pages
const LoginPage = React.lazy(() => import('../Pages/Auth/LoginPage'));
const RegisterPage = React.lazy(() => import('../Pages/Auth/RegisterPage'));
const TenantRegisterPage = React.lazy(() => import('../Pages/Auth/TenantRegisterPageNew'));
const TenantRegistrationSuccessPage = React.lazy(() => import('../Pages/Auth/TenantRegistrationSuccessPage'));

// Public Pages
const LandingPage = React.lazy(() => import('../Pages/Landing/LandingPage'));
const AboutPage = React.lazy(() => import('../Pages/Landing/AboutPage'));
const BlogPage = React.lazy(() => import('../Pages/Landing/BlogPage'));
const ContactPage = React.lazy(() => import('../Pages/Landing/ContactPage'));
const PricingPage = React.lazy(() => import('../Pages/Landing/PricingPage'));

// Payment Pages
const PaymentSuccessPage = React.lazy(() => import('../Pages/Payment/PaymentSuccessPage'));
const PaymentCancelPage = React.lazy(() => import('../Pages/Payment/PaymentCancelPage'));

// Dashboard Pages
const DashboardPage = React.lazy(() => import('../Pages/DashboardPage'));
const TestPage = React.lazy(() => import('../Pages/TestPage'));

// Feature Pages
const ClassesPage = React.lazy(() => import('../Pages/ClassesPage'));
const AssignmentsPage = React.lazy(() => import('../Pages/AssignmentsPage'));
const ExamsPage = React.lazy(() => import('../Pages/ExamsPage'));

// Admin Pages
const TenantManagementPage = React.lazy(() => import('../Pages/Admin/System/TenantManagementPage'));
const SchoolDashboardPage = React.lazy(() => import('../Pages/Admin/School/SchoolDashboardPage'));

// Error Boundary for lazy loading
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Failed to load the page component</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component bảo vệ các route yêu cầu đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Component cho các route public (VD: trang login, nếu đã đăng nhập thì redirect)
const PublicRoute = ({ children, redirectToDashboard = true }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated && redirectToDashboard) {
    return <Navigate to="/dashboard/" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền admin
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin' && user?.role !== 'sys_admin' && user?.role !== 'school_admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền sys_admin
const SysAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'sys_admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền school_admin trở lên
const SchoolAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!['school_admin', 'sys_admin'].includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Component cho các route yêu cầu quyền giáo viên trở lên
const TeacherRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!['teacher', 'admin', 'sys_admin'].includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  const { isLoading } = useAuth();

  // Hiển thị màn hình chờ trong khi xác thực token
  if (isLoading) {
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
      <LazyLoadErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes - Không cần auth */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Payment Routes */}
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/cancel" element={<PaymentCancelPage />} />
            
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
          
          {/* Test page để kiểm tra components */}
          <Route path="test" element={<TestPage />} />
          
          {/* Classes Routes */}
          <Route path="classes" element={<ClassesPage />} />
          {/* <Route path="classes/:id" element={<ClassDetailPage />} /> */}
          
          {/* Assignments Routes */}
          <Route path="assignments" element={<AssignmentsPage />} />
          {/* <Route path="assignments/:id" element={<AssignmentDetailPage />} /> */}
          
          {/* Exams Routes */}
          <Route path="exams" element={<ExamsPage />} />
          {/* <Route path="exams/:id" element={<ExamDetailPage />} /> */}
          
          {/* Admin Routes - System Admin */}
          <Route 
            path="admin/system/tenant-management" 
            element={
              <SysAdminRoute>
                <TenantManagementPage />
              </SysAdminRoute>
            } 
          />
          
          {/* Admin Routes - School Admin */}
          <Route 
            path="admin/school/dashboard" 
            element={
              <SchoolAdminRoute>
                <SchoolDashboardPage />
              </SchoolAdminRoute>
            } 
          />
          
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
        </Suspense>
      </LazyLoadErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
