import { useContext } from 'react';
import { UIContext } from '../Contexts/UIContext';

/**
 * Hook để sử dụng UI Context
 * Cung cấp quyền truy cập vào toàn bộ state và functions để quản lý UI
 * 
 * @returns {Object} UI context object chứa:
 * - theme: Current theme ('light' hoặc 'dark')
 * - toggleTheme: Function để chuyển đổi theme
 * - isDarkMode: Boolean kiểm tra có phải dark mode không
 * - isSidebarOpen: Boolean trạng thái sidebar
 * - toggleSidebar: Function để toggle sidebar
 * - isLoading: Boolean trạng thái loading
 * - setLoading: Function để set loading state
 * - notifications: Array các thông báo
 * - addNotification: Function để thêm thông báo
 * - removeNotification: Function để xóa thông báo
 * - clearNotifications: Function để xóa tất cả thông báo
 * - showSuccess: Function để hiển thị thông báo thành công
 * - showError: Function để hiển thị thông báo lỗi  
 * - showWarning: Function để hiển thị thông báo cảnh báo
 * - showInfo: Function để hiển thị thông báo thông tin
 * - isMobile: Boolean kiểm tra thiết bị mobile
 * - isTablet: Boolean kiểm tra thiết bị tablet
 * - isDesktop: Boolean kiểm tra thiết bị desktop
 */
export const useUI = () => {
  const context = useContext(UIContext);
  
  if (context === undefined) {
    throw new Error('useUI phải được sử dụng trong UIProvider');
  }
  
  return context;
};

// Export additional utility hooks
export const useTheme = () => {
  const { theme, toggleTheme, isDarkMode } = useUI();
  return { theme, toggleTheme, isDarkMode };
};

export const useSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUI();
  return { isSidebarOpen, toggleSidebar };
};

export const useLoading = () => {
  const { isLoading, setLoading } = useUI();
  return { isLoading, setLoading };
};

export const useNotifications = () => {
  const { 
    notifications, 
    addNotification, 
    removeNotification, 
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo 
  } = useUI();
  
  return { 
    notifications, 
    addNotification, 
    removeNotification, 
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo 
  };
};

export const useDevice = () => {
  const { isMobile, isTablet, isDesktop } = useUI();
  return { isMobile, isTablet, isDesktop };
};