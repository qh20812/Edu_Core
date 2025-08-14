import React from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../Hooks/useUI';
import SubscriptionBadge from '../Components/UI/SubscriptionBadge';
import UpgradeBadge from '../Components/UI/UpgradeBadge';
import NotificationDropdown from '../Components/UI/NotificationDropdown';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const TestPage = () => {
  const { 
    theme, 
    isDarkMode, 
    toggleDarkMode, 
    isSidebarOpen, 
    toggleSidebar,
    showSuccess,
    showError,
    showWarning,
    showInfo
  } = useUI();

  const mockSubscriptions = [
    { plan: 'small' },
    { plan: 'medium' },
    { plan: 'large' },
    null
  ];

  const testNotifications = () => {
    showSuccess('Đây là thông báo thành công!');
    setTimeout(() => showWarning('Đây là thông báo cảnh báo!'), 1000);
    setTimeout(() => showError('Đây là thông báo lỗi!'), 2000);
    setTimeout(() => showInfo('Đây là thông báo thông tin!'), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Component Test Page
        </h1>

        {/* UI Controls Test */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">UI Controls</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="w-32 text-sm text-gray-600 dark:text-gray-400">
                Dark Mode:
              </span>
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Current: {theme}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="w-32 text-sm text-gray-600 dark:text-gray-400">
                Sidebar:
              </span>
              <button
                onClick={toggleSidebar}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                {isSidebarOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
                <span>{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}</span>
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                State: {isSidebarOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="w-32 text-sm text-gray-600 dark:text-gray-400">
                Notifications:
              </span>
              <button
                onClick={testNotifications}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Test Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Test Subscription Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Subscription Badges</h2>
          <div className="space-y-4">
            {mockSubscriptions.map((subscription, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="w-24 text-sm text-gray-600 dark:text-gray-400">
                  {subscription?.plan || 'null'}:
                </span>
                <SubscriptionBadge subscription={subscription} />
              </div>
            ))}
          </div>
        </div>

        {/* Test Upgrade Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Upgrade Badges</h2>
          <div className="space-y-4">
            {mockSubscriptions.map((subscription, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="w-24 text-sm text-gray-600 dark:text-gray-400">
                  {subscription?.plan || 'null'}:
                </span>
                <UpgradeBadge subscription={subscription} />
              </div>
            ))}
          </div>
        </div>

        {/* Test Notification Dropdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notification Dropdown</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Click để test:</span>
            <NotificationDropdown />
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
