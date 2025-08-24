import React, { createContext, useState, useEffect } from 'react';

// Helper function để detect system preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper function để lấy theme từ localStorage hoặc system
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('edu-theme');
  if (savedTheme) {
    return savedTheme;
  }
  return getSystemTheme();
};

// Helper function để lấy sidebar state từ localStorage
const getInitialSidebarState = () => {
  const savedState = localStorage.getItem('edu-sidebar-open');
  if (savedState !== null) {
    return JSON.parse(savedState);
  }
  // Mặc định: desktop mở, mobile đóng
  return window.innerWidth >= 1024;
};

// 1. Tạo Context với các giá trị mặc định
const UIContext = createContext({
  theme: 'light',
  isDarkMode: false,
  isSidebarOpen: true,
  isLoading: false,
  notifications: [],
  toggleTheme: () => {},
  toggleDarkMode: () => {},
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
  const [theme, setTheme] = useState(() => getInitialTheme());
  
  // FEATURE: Sidebar management với localStorage
  const [isSidebarOpen, setSidebarOpen] = useState(() => getInitialSidebarState());

  // FEATURE: Global loading state
  const [isLoading, setIsLoading] = useState(false);

  // FEATURE: Notification system
  const [notifications, setNotifications] = useState([]);

  // FEATURE: Device detection state
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  });

  // FEATURE: Responsive sidebar handling và system theme detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
        localStorage.setItem('edu-sidebar-open', 'false');
      } else {
        const savedState = localStorage.getItem('edu-sidebar-open');
        if (savedState === null) {
          setSidebarOpen(true);
          localStorage.setItem('edu-sidebar-open', 'true');
        }
      }

      // Update device info
      setDeviceInfo({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Chỉ cập nhật nếu người dùng chưa manually set theme
      const savedTheme = localStorage.getItem('edu-theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // FEATURE: Dark mode class management
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Force reflow to ensure class changes take effect immediately
    root.offsetHeight;

    // Lưu theme vào localStorage (chỉ khi user manually thay đổi)
    localStorage.setItem('edu-theme', theme);
    
    // Debug log
    console.log('Theme changed to:', theme, 'HTML classes:', root.className);
  }, [theme]);

  // FUNCTION: toggleTheme - Chuyển đổi giữa light/dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // FUNCTION: toggleSidebar - Bật/tắt sidebar và lưu vào localStorage
  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('edu-sidebar-open', JSON.stringify(newState));
      return newState;
    });
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
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isDesktop: deviceInfo.isDesktop,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};