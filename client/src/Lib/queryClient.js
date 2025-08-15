import { QueryClient } from '@tanstack/react-query';

// Tạo QueryClient với cấu hình tối ưu
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data trong 5 phút
      staleTime: 1000 * 60 * 5,
      // Giữ data trong cache 10 phút khi component unmount
      gcTime: 1000 * 60 * 10,
      // Retry 3 lần khi có lỗi
      retry: 3,
      // Refetch khi window focus (hữu ích khi user quay lại tab)
      refetchOnWindowFocus: true,
      // Không refetch khi mount component nếu data còn fresh
      refetchOnMount: 'always',
      // Error boundary sẽ catch error
      throwOnError: false,
    },
    mutations: {
      // Retry mutation 1 lần nếu fail
      retry: 1,
      // Error boundary sẽ catch error
      throwOnError: false,
    },
  },
});

// Query keys để organize cache
export const queryKeys = {
  // Auth related
  auth: {
    me: ['auth', 'me'],
    profile: (userId) => ['auth', 'profile', userId],
  },
  
  // Tenant related
  tenants: {
    all: ['tenants'],
    detail: (id) => ['tenants', id],
    analytics: ['tenants', 'analytics'],
  },
  
  // User related
  users: {
    all: (filters = {}) => ['users', filters],
    detail: (id) => ['users', id],
    byTenant: (tenantId) => ['users', 'tenant', tenantId],
  },
  
  // Class related
  classes: {
    all: (filters = {}) => ['classes', filters],
    detail: (id) => ['classes', id],
    students: (classId) => ['classes', classId, 'students'],
    teachers: (classId) => ['classes', classId, 'teachers'],
  },
  
  // Assignment related
  assignments: {
    all: (filters = {}) => ['assignments', filters],
    detail: (id) => ['assignments', id],
    byClass: (classId) => ['assignments', 'class', classId],
    submissions: (assignmentId) => ['assignments', assignmentId, 'submissions'],
  },
  
  // System related
  system: {
    analytics: ['system', 'analytics'],
    logs: (filters = {}) => ['system', 'logs', filters],
    health: ['system', 'health'],
  }
};

// Utility functions để invalidate cache
export const invalidateQueries = {
  // Invalidate all auth-related queries
  auth: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
  
  // Invalidate specific user profile
  authProfile: (userId) => queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile(userId) }),
  
  // Invalidate all tenant-related queries
  tenants: () => queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all }),
  
  // Invalidate specific tenant
  tenant: (id) => queryClient.invalidateQueries({ queryKey: queryKeys.tenants.detail(id) }),
  
  // Invalidate all user-related queries
  users: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  
  // Invalidate user profile
  userProfile: (id) => queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) }),
  
  // Invalidate all classes
  classes: () => queryClient.invalidateQueries({ queryKey: ['classes'] }),
  
  // Invalidate specific class
  class: (id) => queryClient.invalidateQueries({ queryKey: queryKeys.classes.detail(id) }),
  
  // Invalidate assignments
  assignments: () => queryClient.invalidateQueries({ queryKey: ['assignments'] }),
  
  // Invalidate system analytics
  systemAnalytics: () => queryClient.invalidateQueries({ queryKey: queryKeys.system.analytics }),
};

export default queryClient;
