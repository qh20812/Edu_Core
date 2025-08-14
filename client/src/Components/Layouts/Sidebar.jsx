import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUI } from '../../Hooks/useUI';
import { useAuth } from '../../Hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
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
  const { user, hasRole, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'navigation.dashboard', roles: ['student', 'teacher', 'parent', 'school_admin', 'sys_admin'] },
    
    // Student specific
    { path: '/assignments', icon: <FaTasks />, label: 'navigation.assignments', roles: ['student'] },
    { path: '/exams', icon: <FaFileAlt />, label: 'navigation.exams', roles: ['student'] },
    { path: '/grades', icon: <FaGraduationCap />, label: 'navigation.grades', roles: ['student'] },
    { path: '/schedule', icon: <FaCalendarAlt />, label: 'navigation.schedule', roles: ['student'] },
    
    // Teacher specific
    { path: '/classes', icon: <FaUsers />, label: 'navigation.classes', roles: ['teacher'] },
    { path: '/assignments', icon: <FaClipboard />, label: 'navigation.assignments', roles: ['teacher'] },
    { path: '/exams', icon: <FaFileAlt />, label: 'navigation.exams', roles: ['teacher'] },
    { path: '/grading', icon: <FaChartBar />, label: 'navigation.grading', roles: ['teacher'] },
    
    // Parent specific
    { path: '/children', icon: <FaUserGraduate />, label: 'navigation.children', roles: ['parent'] },
    { path: '/progress', icon: <FaChartBar />, label: 'navigation.progress', roles: ['parent'] },
    
    // System Admin specific
    { path: '/admin/system/tenant-management', icon: <FaBuilding />, label: 'navigation.tenantManagement', roles: ['sys_admin'] },
    { path: '/admin/system/system-analytics', icon: <FaChartBar />, label: 'navigation.systemAnalytics', roles: ['sys_admin'] },
    { path: '/admin/system/user-management', icon: <FaUserShield />, label: 'navigation.globalUserManagement', roles: ['sys_admin'] },
    { path: '/admin/system/system-logs', icon: <FaDatabase />, label: 'navigation.systemLogs', roles: ['sys_admin'] },
    { path: '/admin/system/server-monitor', icon: <FaCubes />, label: 'navigation.serverMonitor', roles: ['sys_admin'] },
    
    // School Admin specific
    { path: '/admin/school/users', icon: <FaUsersCog />, label: 'navigation.schoolUsers', roles: ['school_admin'] },
    { path: '/admin/school/classes', icon: <FaUsers />, label: 'navigation.schoolClasses', roles: ['school_admin'] },
    { path: '/admin/school/subjects', icon: <FaBook />, label: 'navigation.subjects', roles: ['school_admin'] },
    { path: '/admin/school/announcements', icon: <FaBullhorn />, label: 'navigation.announcements', roles: ['school_admin'] },
    { path: '/admin/school/reports', icon: <FaFileAlt />, label: 'navigation.schoolReports', roles: ['school_admin'] },
    { path: '/admin/school/settings', icon: <FaCog />, label: 'navigation.schoolSettings', roles: ['school_admin'] },
  ];

  const navLinkClass = ({ isActive }) =>
    cn(
      'group flex items-center p-3 rounded-lg transition-all duration-200 relative overflow-hidden',
      'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400',
      isActive 
        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-400' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
    );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 ease-in-out shadow-lg',
      'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700',
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
              <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                {t(`roles.${user?.role}`)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) =>
          hasRole(item.roles) && (
            <NavLink to={item.path} key={item.path} className={navLinkClass}>
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
                  <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-1/2 -translate-y-1/2 dark:bg-gray-700"></div>
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
        <NavLink to="/settings" className={navLinkClass}>
          <div className="flex items-center w-full">
            <FaCog className="flex-shrink-0 text-lg transition-transform duration-200 group-hover:rotate-90" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('navigation.settings')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap dark:bg-gray-700 dark:border-gray-600">
              {t('navigation.settings')}
              <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-1/2 -translate-y-1/2 dark:bg-gray-700"></div>
            </div>
          )}
        </NavLink>
        
        <button 
          onClick={handleLogout} 
          className={cn(
            navLinkClass({isActive: false}), 
            'w-full text-left hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400'
          )}
        >
          <div className="flex items-center w-full">
            <FaSignOutAlt className="flex-shrink-0 text-lg transition-transform duration-200 group-hover:translate-x-1" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('auth.logout')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 border border-gray-700 rounded-md opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap dark:bg-gray-700 dark:border-gray-600">
              {t('auth.logout')}
              <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-1/2 -translate-y-1/2 dark:bg-gray-700"></div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;