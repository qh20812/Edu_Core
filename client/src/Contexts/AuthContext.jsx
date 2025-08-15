import React, { createContext } from "react";
import { useCurrentUser, useLogin, useLogout, useRegister } from '../Hooks/useAuthQueries';

// 1. Tạo Context
const AuthContext = createContext(null);

// Export để có thể sử dụng trong hook
export { AuthContext };

// 2. Tạo Provider Component với React Query
export const AuthProvider = ({ children }) => {
  // Sử dụng React Query hooks thay vì useState
  const { 
    data: userData, 
    isLoading, 
    error: userError,
    refetch: refetchUser 
  } = useCurrentUser();
  
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  // Extract user và tenant từ response
  const user = userData?.data?.user || null;
  const tenant = userData?.data?.tenant || null;
  const token = localStorage.getItem('token');

  // Hàm login wrapper
  const login = async (email, password) => {
    await loginMutation.mutateAsync({ email, password });
    return { success: true };
  };

  // Hàm register wrapper
  const register = async (userData) => {
    await registerMutation.mutateAsync(userData);
    return { success: true };
  };

  // Hàm logout wrapper
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      // Even if backend fails, clear local data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      throw error;
    }
  };

  // Helper functions để kiểm tra role
  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin';
  const isSysAdmin = user?.role === 'sys_admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  const isParent = user?.role === 'parent';

  const hasRole = (role) => user?.role === role;
  const hasAnyRole = (roles) => roles.includes(user?.role);
  
  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.includes(permission);
  };

  // Context value với tất cả data và functions
  const contextValue = {
    // User data
    user,
    tenant,
    token,
    
    // Loading states
    loading: isLoading,
    isLoading: isLoading,
    loginLoading: loginMutation.isPending,
    logoutLoading: logoutMutation.isPending,
    registerLoading: registerMutation.isPending,
    
    // Error states
    error: userError,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    
    // Auth status
    isAuthenticated,
    isLoggedIn: isAuthenticated, // Legacy support
    
    // Actions
    login,
    logout,
    register,
    refetchUser,
    
    // Role helpers
    isAdmin,
    isSysAdmin,
    isTeacher,
    isStudent,
    isParent,
    hasRole,
    hasAnyRole,
    hasPermission,
    
    // Tenant info
    tenantId: tenant?.id,
    tenantName: tenant?.name,
    tenantStatus: tenant?.status,
    
    // User info helpers
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.name,
    userRole: user?.role,
    userAvatar: user?.avatar,
    
    // Subscription info (if available)
    subscriptionStatus: tenant?.subscription?.status,
    subscriptionPlan: tenant?.subscription?.plan,
    subscriptionExpiry: tenant?.subscription?.expiryDate,
    planType: tenant?.plan,
    maxStudents: tenant?.maxStudents,
    
    // Legacy methods for backward compatibility
    canAddStudents: () => {
      if (!tenant) return true;
      return tenant.subscription?.status === 'active';
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

