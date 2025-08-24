import { useQuery, useMutation } from '@tanstack/react-query';
import { queryKeys, invalidateQueries, queryClient } from '../Lib/queryClient';
import { apiClient } from '../Lib/apiClient';

// Hook để lấy system analytics
export const useSystemAnalytics = () => {
  return useQuery({
    queryKey: queryKeys.system.analytics,
    queryFn: async () => {
      const response = await apiClient.get('/system/analytics');
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes - analytics cần fresh hơn
    refetchInterval: 1000 * 60 * 5, // Auto refetch mỗi 5 phút
  });
};

// Hook để lấy system health
export const useSystemHealth = () => {
  return useQuery({
    queryKey: queryKeys.system.health,
    queryFn: async () => {
      const response = await apiClient.get('/system/health');
      return response.data;
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Auto refetch mỗi phút
  });
};

// Hook để lấy danh sách tenants (cho sys_admin)
export const useTenants = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.tenants.all,
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await apiClient.get(`/tenant/all?${params}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

// Hook để approve tenant
export const useApproveTenant = () => {
  return useMutation({
    mutationFn: async (tenantId) => {
      const response = await apiClient.put(`/tenant/${tenantId}/approve`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate tenants list và system analytics
      invalidateQueries.tenants();
      invalidateQueries.systemAnalytics();
    },
  });
};

// Hook để reject tenant
export const useRejectTenant = () => {
  return useMutation({
    mutationFn: async ({ tenantId, reason }) => {
      const response = await apiClient.put(`/tenant/${tenantId}/reject`, { reason });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate tenants list và system analytics
      invalidateQueries.tenants();
      invalidateQueries.systemAnalytics();
    },
  });
};

// Hook để lấy thông tin user hiện tại
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const response = await apiClient.get('/auth/me');
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Chỉ retry 1 lần cho auth
  });
};

// Hook để login
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      // Lưu token vào localStorage
      localStorage.setItem('token', data.data.token);
      // Invalidate auth queries để refetch user info
      invalidateQueries.auth();
    },
  });
};

// Hook để logout
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      // Xóa token và clear cache
      localStorage.removeItem('token');
      queryClient.clear();
    },
  });
};

// Hook để register tenant
export const useRegisterTenant = () => {
  return useMutation({
    mutationFn: async (tenantData) => {
      const response = await apiClient.post('/tenant/register', tenantData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate tenants nếu user là sys_admin
      invalidateQueries.tenants();
    },
  });
};
