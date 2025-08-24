/**
 * Utility functions để handle token và authentication
 */

// Check nếu token đã expired (client-side check)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Nếu token sắp hết hạn trong 1 phút thì coi như expired
    return payload.exp < (currentTime + 60);
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

// Clear toàn bộ auth data
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tenant');
};

// Get user info từ localStorage (fallback khi API fail)
export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const tenant = localStorage.getItem('tenant');
    return {
      user: user ? JSON.parse(user) : null,
      tenant: tenant ? JSON.parse(tenant) : null
    };
  } catch (error) {
    console.error('Error parsing user data from storage:', error);
    return { user: null, tenant: null };
  }
};

// Validate token format
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  // JWT token should have 3 parts separated by dots
  const parts = token.split('.');
  return parts.length === 3;
};

// Check if current route is public
export const isPublicRoute = (pathname) => {
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/forgot-password',
    '/reset-password'
  ];
  
  return publicPaths.includes(pathname) || 
         pathname.startsWith('/auth/') ||
         pathname.startsWith('/public/');
};

// Generate return URL for login redirect
export const getReturnUrl = (currentPath) => {
  if (isPublicRoute(currentPath)) return '/dashboard';
  return currentPath;
};
