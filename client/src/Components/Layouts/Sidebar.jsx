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
    { path: '/dashboard', icon: <FaHome />, label: 'navigation.dashboard', roles: ['student', 'teacher', 'parent', 'admin'] },
    
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
    
    // Admin specific
    { path: '/users', icon: <FaUsersCog />, label: 'navigation.users', roles: ['admin'] },
    { path: '/schools', icon: <FaBuilding />, label: 'navigation.schools', roles: ['admin'] },
    { path: '/subjects', icon: <FaBook />, label: 'navigation.subjects', roles: ['admin'] },
    { path: '/announcements', icon: <FaBullhorn />, label: 'navigation.announcements', roles: ['admin'] },
    { path: '/reports', icon: <FaDatabase />, label: 'navigation.reports', roles: ['admin'] },
  ];

  const navLinkClass = ({ isActive }) =>
    cn(
      'group flex items-center p-3 rounded-xl transition-all duration-200 relative overflow-hidden',
      'text-slate-300 hover:text-white',
      isActive 
        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
        : 'hover:bg-slate-700/50 hover:shadow-md'
    );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 ease-in-out shadow-xl',
      isSidebarOpen ? 'w-72' : 'w-16'
    )}>
      {/* Brand Section */}
      <div className="relative flex items-center justify-between h-16 px-4 border-b bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
        <div className="flex items-center justify-center w-full">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <FaGraduationCap className="text-lg text-white" />
              </div>
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                EduCore
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <span className="text-lg font-bold text-white">EC</span>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      {isSidebarOpen && (
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <img
              className="w-10 h-10 border-2 rounded-full border-primary/30"
              src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
              alt={user?.full_name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.full_name}
              </p>
              <p className="text-xs truncate text-slate-400">
                {t(`roles.${user?.role}`)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {navItems.map((item) =>
          hasRole(item.roles) && (
            <NavLink to={item.path} key={item.path} className={navLinkClass}>
              <div className="flex items-center w-full">
                <span className="flex-shrink-0 text-xl transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium truncate transition-all duration-200">
                    {t(item.label)}
                  </span>
                )}
              </div>
              {!isSidebarOpen && (
                <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 border rounded-md opacity-0 left-full bg-slate-900 group-hover:opacity-100 group-hover:visible whitespace-nowrap border-slate-700/50">
                  {t(item.label)}
                </div>
              )}
            </NavLink>
          )
        )}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 space-y-1 border-t border-slate-700/50 bg-slate-900/30">
        <NavLink to="/settings" className={navLinkClass}>
          <div className="flex items-center w-full">
            <FaCog className="flex-shrink-0 text-xl transition-transform duration-200 group-hover:rotate-90" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('navigation.settings')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 border rounded-md opacity-0 left-full bg-slate-900 group-hover:opacity-100 group-hover:visible whitespace-nowrap border-slate-700/50">
              {t('navigation.settings')}
            </div>
          )}
        </NavLink>
        
        <button 
          onClick={handleLogout} 
          className={cn(
            navLinkClass({isActive: false}), 
            'w-full text-left hover:bg-danger/10 hover:text-danger-foreground'
          )}
        >
          <div className="flex items-center w-full">
            <FaSignOutAlt className="flex-shrink-0 text-xl transition-transform duration-200 group-hover:translate-x-1" />
            {isSidebarOpen && <span className="ml-3 font-medium">{t('auth.logout')}</span>}
          </div>
          {!isSidebarOpen && (
            <div className="absolute z-50 invisible px-2 py-1 ml-2 text-sm text-white transition-all duration-200 border rounded-md opacity-0 left-full bg-slate-900 group-hover:opacity-100 group-hover:visible whitespace-nowrap border-slate-700/50">
              {t('auth.logout')}
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;