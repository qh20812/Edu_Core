import { useQuery, useMutation } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '../Lib/queryClient';
import { systemService } from '../Services/system.service';

/**
 * React Query hooks for system operations
 * Thay thế việc quản lý state bằng useState trong các components
 */

// Hook để lấy system analytics với auto-refresh
export const useSystemAnalytics = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.system.analytics,
    queryFn: systemService.getAnalytics,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // Auto refetch mỗi 5 phút
    retry: 2,
    ...options
  });
};

// Hook để lấy system health với frequent updates
export const useSystemHealth = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.system.health,
    queryFn: systemService.getHealth,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Auto refetch mỗi phút
    retry: 1,
    ...options
  });
};

// Hook để lấy database stats
export const useDatabaseStats = (options = {}) => {
  return useQuery({
    queryKey: ['system', 'database'],
    queryFn: systemService.getDatabaseStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    ...options
  });
};

// Hook để lấy activity logs với filters
export const useActivityLogs = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['system', 'activity', filters],
    queryFn: () => systemService.getActivityLogs(filters),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!Object.keys(filters).length || options.enabled !== false,
    ...options
  });
};

// Hook để lấy system logs với pagination
export const useSystemLogs = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.system.logs(filters),
    queryFn: () => systemService.getLogs(filters),
    staleTime: 1000 * 60, // 1 minute
    keepPreviousData: true, // Giữ data cũ khi filtering
    ...options
  });
};

// Hook để lấy system configuration
export const useSystemConfig = (options = {}) => {
  return useQuery({
    queryKey: ['system', 'config'],
    queryFn: systemService.getConfiguration,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options
  });
};

// Mutation hooks cho các operations

// Hook để backup database
export const useBackupDatabase = () => {
  return useMutation({
    mutationFn: systemService.backupDatabase,
    onSuccess: () => {
      invalidateQueries.systemAnalytics();
    },
  });
};

// Hook để clear cache
export const useClearCache = () => {
  return useMutation({
    mutationFn: systemService.clearCache,
    onSuccess: () => {
      // Invalidate tất cả cache-related queries
      invalidateQueries.systemAnalytics();
    },
  });
};

// Hook để restart service
export const useRestartService = () => {
  return useMutation({
    mutationFn: systemService.restartService,
    onSuccess: () => {
      // Refetch health status sau khi restart
      invalidateQueries.systemAnalytics();
    },
  });
};

// Hook để update system configuration
export const useUpdateSystemConfig = () => {
  return useMutation({
    mutationFn: systemService.updateConfiguration,
    onSuccess: () => {
      // Invalidate config và analytics
      invalidateQueries.systemAnalytics();
    },
  });
};

// Compound hook để lấy tất cả system data cùng lúc
export const useSystemOverview = () => {
  const analytics = useSystemAnalytics();
  const health = useSystemHealth();
  const databaseStats = useDatabaseStats();
  
  return {
    analytics,
    health,
    databaseStats,
    isLoading: analytics.isLoading || health.isLoading || databaseStats.isLoading,
    isError: analytics.isError || health.isError || databaseStats.isError,
    error: analytics.error || health.error || databaseStats.error,
    refetchAll: () => {
      analytics.refetch();
      health.refetch();
      databaseStats.refetch();
    }
  };
};
