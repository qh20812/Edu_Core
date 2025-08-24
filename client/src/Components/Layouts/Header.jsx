import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUI } from '../../Hooks/useUI';
import { useAuth } from '../../Hooks/useAuthQueries';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { 
  FaBars, 
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
import NotificationDropdown from '../UI/NotificationDropdown';
import SubscriptionBadge from '../UI/SubscriptionBadge';
import UpgradeBadge from '../UI/UpgradeBadge';

const Header = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { toggleSidebar, isDarkMode, toggleDarkMode } = useUI();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const profileDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
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

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 border-b shadow-lg md:px-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 transition-all duration-200 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          aria-label="Toggle sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
        
        <div className="hidden md:block">
          <Link 
            to="/dashboard" 
            className="text-2xl font-bold text-transparent transition-all duration-200 bg-gradient-to-r from-primary to-secondary bg-clip-text hover:from-primary/80 hover:to-secondary/80"
          >
            EduCore
          </Link>
        </div>
      </div>
      
      {/* Center - Search */}
      <div className="flex-1 hidden max-w-md mx-4 md:block">
        <form onSubmit={handleSearch} className="relative">
          <FaSearch className="absolute transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search') + "..."}
            className="w-full py-2 pl-10 pr-4 transition-all duration-200 border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm focus:shadow-md"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Language Switcher */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="p-2 transition-all duration-200 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            aria-label="Change language"
          >
            <FaGlobe className="w-5 h-5" />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 z-50 w-32 py-1 mt-2 bg-white border shadow-xl top-full dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-600">
              <button
                onClick={() => changeLanguage('en')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg',
                  i18n.language === 'en' ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                )}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('vi')}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg',
                  i18n.language === 'vi' ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
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
          className="p-2 transition-all duration-200 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>

        {/* Upgrade Badge - Hide for sys_admin */}
        {user?.role !== 'sys_admin' && (
          <UpgradeBadge subscription={user?.tenant?.subscription} />
        )}

        {/* Notifications */}
        <NotificationDropdown />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center p-2 space-x-2 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            aria-label="Profile menu"
          >
            <img
              className="w-8 h-8 border-2 rounded-full border-gray-200 dark:border-gray-600"
              src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
              alt={user?.full_name}
            />
            <FaChevronDown className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 z-50 w-64 mt-2 bg-white border shadow-xl top-full dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-600">
              {/* User Info */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-12 h-12 border-2 rounded-full border-blue-200 dark:border-blue-600"
                    src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=3b82f6&color=fff`}
                    alt={user?.full_name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                      {user?.full_name}
                    </p>
                    <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {t(`roles.${user?.role}`)}
                      </p>
                      <SubscriptionBadge subscription={user?.tenant?.subscription} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-2"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <FaUserCircle className="w-4 h-4 mr-3" />
                  {t('navigation.profile')}
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-sm transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-2"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <FaCog className="w-4 h-4 mr-3" />
                  {t('navigation.settings')}
                </Link>
                
                <hr className="my-1 border-gray-200 dark:border-gray-600" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-2"
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