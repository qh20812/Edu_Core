import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useUI } from '../../Hooks/useUI';
import { useAuth } from '../../Hooks/useAuthQueries';
import { useTranslation } from 'react-i18next';
import { cn } from '../../Lib/utils';
import {
  FaHome,
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaClipboard,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBullhorn,
  FaCalendarAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTasks,
  FaChartBar,
  FaUserShield,
  FaBuilding,
  FaUsersCog,
  FaCubes,
  FaDatabase,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = () => {
  const { isSidebarOpen} = useUI();
  const { user, hasAnyRole, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/', icon: <FaHome />, label: 'navigation.dashboard', roles: ['student', 'teacher', 'parent', 'school_admin', 'sys_admin'] },
    
    // Student specific
    { path: '/dashboard/assignments', icon: <FaTasks />, label: 'navigation.assignments', roles: ['student'] },
    { path: '/dashboard/exams', icon: <FaFileAlt />, label: 'navigation.exams', roles: ['student'] },
    { path: '/dashboard/grades', icon: <FaGraduationCap />, label: 'navigation.grades', roles: ['student'] },
    { path: '/dashboard/schedule', icon: <FaCalendarAlt />, label: 'navigation.schedule', roles: ['student'] },
    
    // Teacher specific
    { path: '/dashboard/classes', icon: <FaUsers />, label: 'navigation.classes', roles: ['teacher'] },
    { path: '/dashboard/assignments', icon: <FaClipboard />, label: 'navigation.assignments', roles: ['teacher'] },
    { path: '/dashboard/exams', icon: <FaFileAlt />, label: 'navigation.exams', roles: ['teacher'] },
    { path: '/dashboard/grading', icon: <FaChartBar />, label: 'navigation.grading', roles: ['teacher'] },
    
    // Parent specific
    { path: '/dashboard/children', icon: <FaUserGraduate />, label: 'navigation.children', roles: ['parent'] },
    { path: '/dashboard/progress', icon: <FaChartBar />, label: 'navigation.progress', roles: ['parent'] },
    
    // System Admin specific
    { path: '/dashboard/admin/system/tenant-management', icon: <FaBuilding />, label: 'navigation.tenantManagement', roles: ['sys_admin'] },
    { path: '/dashboard/admin/system/system-analytics', icon: <FaChartBar />, label: 'navigation.systemAnalytics', roles: ['sys_admin'] },
    { path: '/dashboard/admin/system/user-management', icon: <FaUserShield />, label: 'navigation.globalUserManagement', roles: ['sys_admin'] },
    { path: '/dashboard/admin/system/system-logs', icon: <FaDatabase />, label: 'navigation.systemLogs', roles: ['sys_admin'] },
    { path: '/dashboard/admin/system/server-monitor', icon: <FaCubes />, label: 'navigation.serverMonitor', roles: ['sys_admin'] },
    
    // School Admin specific
    { path: '/dashboard/admin/school/users', icon: <FaUsersCog />, label: 'navigation.schoolUsers', roles: ['school_admin'] },
    { path: '/dashboard/admin/school/classes', icon: <FaUsers />, label: 'navigation.schoolClasses', roles: ['school_admin'] },
    { path: '/dashboard/admin/school/subjects', icon: <FaBook />, label: 'navigation.subjects', roles: ['school_admin'] },
    { path: '/dashboard/admin/school/announcements', icon: <FaBullhorn />, label: 'navigation.announcements', roles: ['school_admin'] },
    { path: '/dashboard/admin/school/reports', icon: <FaFileAlt />, label: 'navigation.schoolReports', roles: ['school_admin'] },
    { path: '/dashboard/admin/school/settings', icon: <FaCog />, label: 'navigation.schoolSettings', roles: ['school_admin'] },
  ];

  // Function để check active state chính xác - tránh multiple active
  const getNavLinkClass = (itemPath) => () => {
    const currentPath = location.pathname;
    let isItemActive = false;
    
    // Exact match có priority cao nhất
    if (currentPath === itemPath) {
      isItemActive = true;
    }
    // Dashboard root chỉ active khi exactly ở dashboard
    else if (itemPath === '/dashboard/') {
      isItemActive = currentPath === '/dashboard' || currentPath === '/dashboard/';
    }
    // Các nested routes - chỉ active khi là parent path chính xác
    else if (currentPath.startsWith(itemPath + '/')) {
      // Đảm bảo không có path nào dài hơn cũng match
      const longerPaths = navItems
        .filter(item => item.path.startsWith(itemPath + '/') && item.path.length > itemPath.length)
        .map(item => item.path);
      
      // Chỉ active nếu không có path con nào match chính xác hơn
      isItemActive = !longerPaths.some(path => currentPath.startsWith(path));
    }

    return cn(
      'group flex items-center p-3 rounded-lg transition-all duration-200 relative overflow-hidden',
      'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400',
      'hover:bg-blue-50 dark:hover:bg-gray-800',
      isItemActive 
        ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600 shadow-md dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-400 font-semibold' 
        : ''
    );
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback logout nếu API fail
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenant');
      navigate('/login');
    }
  };

  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 ease-in-out',
      'bg-white dark:bg-gray-900',
      'border-gray-200 dark:border-gray-700',
      'shadow-xl dark:shadow-2xl',
      isSidebarOpen ? 'w-72' : 'w-16'
    )}>
      {/* Brand Section */}
      <div className={cn(
        'relative flex items-center justify-between h-16 px-4 border-b',
        'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700',
        'border-gray-200 dark:border-gray-700'
      )}>
        <div className="flex items-center justify-center w-full">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-lg dark:bg-gray-100">
                <FaGraduationCap className="text-lg text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white">
                EduCore
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg dark:bg-gray-100">
              <FaGraduationCap className="text-lg text-blue-600" />
            </div>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      {isSidebarOpen && (
        <div className={cn(
          'p-4 border-b',
          'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        )}>
          <div className="flex items-center space-x-3">
            <img
              className="w-10 h-10 border-2 border-blue-200 rounded-full dark:border-blue-300"
              src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
              alt={user?.full_name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                {user?.full_name}
              </p>
              <p className="text-xs text-gray-600 truncate dark:text-gray-400">
                {t(`roles.${user?.role}`)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) =>
          hasAnyRole(item.roles) && (
            <NavLink to={item.path} key={item.path} className={getNavLinkClass(item.path)}>
              <div className="flex items-center w-full">
                <span className="flex-shrink-0 text-lg transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium truncate transition-all duration-200">
                    {t(item.label)}
                  </span>
                )}
              </div>
              {!isSidebarOpen && (
                <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap dark:bg-gray-700 dark:border-gray-600">
                  {t(item.label)}
                  <div className="absolute w-2 h-2 transform rotate-45 -translate-y-1/2 bg-gray-900 -left-1 top-1/2 dark:bg-gray-700"></div>
                </div>
              )}
            </NavLink>
          )
        )}
      </nav>

      {/* Bottom Section */}
      <div className={cn(
        'px-3 py-4 space-y-1 border-t',
        'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      )}>
        <NavLink to="/settings" className={getNavLinkClass('/settings')}>
          <div className="flex items-center w-full">
            <FaCog className="flex-shrink-0 text-lg transition-transform duration-200 group-hover:rotate-90" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('navigation.settings')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap dark:bg-gray-700 dark:border-gray-600">
              {t('navigation.settings')}
              <div className="absolute w-2 h-2 transform rotate-45 -translate-y-1/2 bg-gray-900 -left-1 top-1/2 dark:bg-gray-700"></div>
            </div>
          )}
        </NavLink>
        
        <button 
          onClick={handleLogout} 
          className={cn(
            'group flex items-center p-3 rounded-lg transition-all duration-200 relative overflow-hidden w-full text-left',
            'text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400',
            'hover:bg-red-50 dark:hover:bg-red-900/30'
          )}
        >
          <div className="flex items-center w-full">
            <FaSignOutAlt className="flex-shrink-0 text-lg transition-transform duration-200 group-hover:translate-x-1" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('auth.logout')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap dark:bg-gray-700 dark:border-gray-600">
              {t('auth.logout')}
              <div className="absolute w-2 h-2 transform rotate-45 -translate-y-1/2 bg-gray-900 -left-1 top-1/2 dark:bg-gray-700"></div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;