import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUI } from '../../Hooks/useUI';
import { useAuth } from '../../Hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { 
  FaBars, 
  FaBell, 
  FaSearch, 
  FaUser, 
  FaSignOutAlt, 
  FaMoon, 
  FaSun,
  FaGlobe,
  FaChevronDown,
  FaCog,
  FaUserCircle
} from 'react-icons/fa';

const Header = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { toggleSidebar, isDarkMode, toggleDarkMode } = useUI();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Mock notifications - replace with real data
  const notifications = [
    { id: 1, title: 'New Assignment', message: 'Math homework due tomorrow', time: '2 min ago', unread: true },
    { id: 2, title: 'Grade Posted', message: 'History quiz grade available', time: '1 hour ago', unread: true },
    { id: 3, title: 'Announcement', message: 'School closure notification', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
        
        <div className="hidden md:block">
          <Link 
            to="/dashboard" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-primary/80 hover:to-secondary/80 transition-all duration-200"
          >
            EduCore
          </Link>
        </div>
      </div>
      
      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search') + "..."}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Language Switcher */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Change language"
          >
            <FaGlobe className="w-5 h-5" />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <button
                onClick={() => changeLanguage('en')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors',
                  i18n.language === 'en' ? 'text-primary font-medium' : 'text-slate-700 dark:text-slate-300'
                )}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('vi')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors',
                  i18n.language === 'vi' ? 'text-primary font-medium' : 'text-slate-700 dark:text-slate-300'
                )}
              >
                Tiếng Việt
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationDropdownRef}>
          <button
            onClick={() => setNotificationDropdownOpen(!isNotificationDropdownOpen)}
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Notifications"
          >
            <FaBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {isNotificationDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {t('common.notifications')}
                </h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer',
                        notification.unread && 'bg-primary/5 dark:bg-primary/10'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    {t('common.noNotifications')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Profile menu"
          >
            <img
              className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600"
              src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
              alt={user?.full_name}
            />
            <FaChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50">
              {/* User Info */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-primary/30"
                    src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
                    alt={user?.full_name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {user?.full_name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {t(`roles.${user?.role}`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <FaUserCircle className="w-4 h-4 mr-3" />
                  {t('navigation.profile')}
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <FaCog className="w-4 h-4 mr-3" />
                  {t('navigation.settings')}
                </Link>
                
                <hr className="my-1 border-slate-200 dark:border-slate-700" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3" />
                  {t('auth.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;