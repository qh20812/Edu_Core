const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Import auth utilities
import { clearAuthData, isPublicRoute, isValidTokenFormat } from '../Utils/authUtils';

// Hàm helper để handle auth error và redirect
const handleAuthError = (error) => {
  console.warn('Auth error detected:', error);
  clearAuthData();
  
  // Redirect về login page nếu không phải đang ở trang public
  const currentPath = window.location.pathname;
  
  if (!isPublicRoute(currentPath)) {
    // Sử dụng setTimeout để tránh conflict với React state updates
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }
};

// Hàm helper để tạo request
const request = async (endpoint, method, body = null) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  // Validate token format before using
  if (token && isValidTokenFormat(token)) {
    headers.Authorization = `Bearer ${token}`;
  } else if (token) {
    // Token format invalid, clear it
    console.warn('Invalid token format detected, clearing auth data');
    clearAuthData();
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Xử lý các loại 401 error
      if (response.status === 401) {
        const errorMessage = data.message || 'Unauthorized';
        
        if (errorMessage.includes('expired') || errorMessage.includes('Token expired')) {
          console.warn('Token expired');
          handleAuthError('Token expired');
          throw new Error('Session expired. Please login again.');
        } else {
          console.warn('Unauthorized access');
          handleAuthError('Unauthorized');
          throw new Error('Unauthorized access. Please login.');
        }
      }
      
      throw new Error(data.message || 'Có lỗi xảy ra');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${method} ${endpoint}:`, error);
    
    // Log detailed response for debugging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    // Re-throw error để React Query có thể handle
    throw error;
  }
};

// Tạo các phương thức tiện ích
export const apiClient = {
  get: (endpoint) => request(endpoint, 'GET'),
  post: (endpoint, body) => request(endpoint, 'POST', body),
  put: (endpoint, body) => request(endpoint, 'PUT', body),
  delete: (endpoint) => request(endpoint, 'DELETE'),
};