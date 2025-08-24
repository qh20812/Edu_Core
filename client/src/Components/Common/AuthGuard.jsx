import React, { useEffect } from 'react';
import { useAuth } from '../Hooks/useAuthQueries';
import { useUI } from '../Hooks/useUI';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Component để xử lý token expired và authentication errors
 * Nên được đặt trong App.jsx để guard toàn bộ ứng dụng
 */
const AuthGuard = ({ children }) => {
  const { isTokenExpired, token, error } = useAuth();
  const { showError } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Nếu token expired và user đang ở protected route
    if (isTokenExpired && token) {
      console.warn('Token expired, redirecting to login');
      showError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      
      // Redirect to login với return URL
      const currentPath = location.pathname;
      const publicPaths = ['/', '/login', '/register', '/about', '/contact'];
      
      if (!publicPaths.includes(currentPath)) {
        navigate('/login', { 
          state: { from: currentPath },
          replace: true 
        });
      }
    }
  }, [isTokenExpired, token, navigate, location, showError]);

  // Hiển thị error nếu có authentication error khác
  useEffect(() => {
    if (error && !isTokenExpired) {
      console.error('Auth error:', error);
      // Chỉ show error nếu không phải token expired (đã handle ở trên)
      if (!error.message?.includes('expired')) {
        showError('Lỗi xác thực: ' + error.message);
      }
    }
  }, [error, isTokenExpired, showError]);

  return children;
};

export default AuthGuard;
