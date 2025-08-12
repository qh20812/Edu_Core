import React, { createContext, useState, useEffect } from 'react';

// 1. Tạo Context với các giá trị mặc định
const UIContext = createContext({
  theme: 'light',
  isSidebarOpen: true,
  isLoading: false,
  notifications: [],
  toggleTheme: () => {},
  toggleSidebar: () => {},
  setLoading: () => {},
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
});

// Export để có thể sử dụng trong hook
export { UIContext };

// 2. Tạo Provider Component
export const UIProvider = ({ children }) => {
  // FEATURE: Theme management (light/dark mode)
  // State để quản lý theme (sáng/tối)
  // Lấy giá trị từ localStorage để ghi nhớ lựa chọn của người dùng, mặc định là 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('edu-theme') || 'light');
  
  // FEATURE: Sidebar management
  // State để quản lý trạng thái của thanh sidebar (responsive)
  const [isSidebarOpen, setSidebarOpen] = useState(() => {
    // Trên mobile mặc định đóng sidebar, desktop thì mở
    return window.innerWidth >= 1024;
  });

  // FEATURE: Global loading state
  // State để quản lý trạng thái loading toàn cục
  const [isLoading, setIsLoading] = useState(false);

  // FEATURE: Notification system
  // State để quản lý thông báo (toast notifications)
  const [notifications, setNotifications] = useState([]);

  // FEATURE: Responsive sidebar handling
  // useEffect để xử lý responsive sidebar khi resize màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FEATURE: Dark mode class management
  // useEffect để cập nhật class trên thẻ <html> mỗi khi theme thay đổi
  // Giúp Tailwind CSS nhận diện và áp dụng style cho dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Lưu lựa chọn theme vào localStorage với prefix dự án
    localStorage.setItem('edu-theme', theme);
  }, [theme]);

  // FUNCTION: toggleTheme - Chuyển đổi giữa light/dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // FUNCTION: toggleSidebar - Bật/tắt sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // FUNCTION: setLoading - Quản lý trạng thái loading toàn cục
  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  // FUNCTION: addNotification - Thêm thông báo mới
  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info', // success, error, warning, info
      title: '',
      message: '',
      duration: 5000, // 5 seconds default
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Tự động xóa thông báo sau duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  // FUNCTION: removeNotification - Xóa thông báo theo ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // FUNCTION: clearNotifications - Xóa tất cả thông báo
  const clearNotifications = () => {
    setNotifications([]);
  };

  // FEATURE: Show success notification shortcut
  const showSuccess = (message, title = 'Thành công') => {
    return addNotification({
      type: 'success',
      title,
      message,
    });
  };

  // FEATURE: Show error notification shortcut
  const showError = (message, title = 'Lỗi') => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 7000, // Error messages stay longer
    });
  };

  // FEATURE: Show warning notification shortcut
  const showWarning = (message, title = 'Cảnh báo') => {
    return addNotification({
      type: 'warning',
      title,
      message,
    });
  };

  // FEATURE: Show info notification shortcut
  const showInfo = (message, title = 'Thông tin') => {
    return addNotification({
      type: 'info',
      title,
      message,
    });
  };

  // Giá trị sẽ được cung cấp cho toàn bộ ứng dụng
  const value = {
    // Theme management
    theme,
    toggleTheme,
    toggleDarkMode: toggleTheme, // Alias for toggleTheme
    isDarkMode: theme === 'dark',
    
    // Sidebar management
    isSidebarOpen,
    toggleSidebar,
    
    // Loading management
    isLoading,
    setLoading,
    
    // Notification management
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    
    // Notification shortcuts
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Device info
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};