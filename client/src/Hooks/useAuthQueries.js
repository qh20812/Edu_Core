import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '../Lib/queryClient';
import { authService } from '../Services/auth.service';

/**
 * Enhanced auth hooks using React Query
 * Thay thế việc quản lý auth state bằng useState
 */

// Hook để lấy thông tin user hiện tại
export const useCurrentUser = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getMe,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: (failureCount, error) => {
      // Không retry nếu là 401 (unauthorized) hoặc token expired
      if (error?.message?.includes('expired') || 
          error?.message?.includes('Unauthorized') ||
          error?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    // Chỉ fetch khi có token
    enabled: !!localStorage.getItem('token'),
    onError: (error) => {
      // Nếu token expired hoặc unauthorized, clear cache
      if (error?.message?.includes('expired') || 
          error?.message?.includes('Unauthorized')) {
        console.warn('Auth error, clearing cache:', error.message);
        queryClient.clear();
      }
    },
    ...options
  });
};

// Hook để login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      // Lưu token và user info
      const { token, user, tenant } = data.data;
      localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      if (tenant) localStorage.setItem('tenant', JSON.stringify(tenant));
      
      // Set user data trong cache
      queryClient.setQueryData(queryKeys.auth.me, data);
      
      // Invalidate các auth queries để refetch
      invalidateQueries.auth();
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Clear any existing auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
    }
  });
};

// Hook để register
export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      // Có thể auto-login sau khi register nếu backend trả về token
      if (data.data.token) {
        const { token, user, tenant } = data.data;
        localStorage.setItem('token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));
        if (tenant) localStorage.setItem('tenant', JSON.stringify(tenant));
        
        invalidateQueries.auth();
      }
    }
  });
};

// Hook để logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      
      // Clear tất cả cache
      queryClient.clear();
    },
    onError: () => {
      // Ngay cả khi backend error, vẫn clear local data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      queryClient.clear();
    }
  });
};

// Hook để change password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }) => 
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      // Có thể refetch user info nếu cần
      invalidateQueries.auth();
    }
  });
};

// Hook để forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authService.forgotPassword(email)
  });
};

// Hook để reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }) => 
      authService.resetPassword(token, newPassword)
  });
};

// Hook để verify email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token) => authService.verifyEmail(token),
    onSuccess: () => {
      // Refetch user info để cập nhật verification status
      invalidateQueries.auth();
    }
  });
};

// Hook để resend verification
export const useResendVerification = () => {
  return useMutation({
    mutationFn: (email) => authService.resendVerification(email)
  });
};

// Hook để refresh token
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        // Refetch user info với token mới
        invalidateQueries.auth();
      }
    },
    onError: () => {
      // Token refresh failed, logout user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      queryClient.clear();
    }
  });
};

// Compound hook cho auth state
export const useAuth = () => {
  const { data, isLoading, error, isError } = useCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();
  
  // Extract user và tenant từ response
  const user = data?.data?.user || null;
  const tenant = data?.data?.tenant || null;
  const token = localStorage.getItem('token');
  
  // Nếu có error và là token expired, coi như không authenticated
  const isTokenExpired = error?.message?.includes('expired') || 
                        error?.message?.includes('Unauthorized');
  
  const isAuthenticated = !!user && !!token && !isTokenExpired;
  
  return {
    user,
    tenant,
    token,
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending || registerMutation.isPending,
    error,
    isError,
    isTokenExpired,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    // Helper functions
    isAdmin: user?.role === 'admin',
    isSysAdmin: user?.role === 'sys_admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    hasRole: (role) => user?.role === role,
    hasAnyRole: (roles) => roles.includes(user?.role),
  };
};
