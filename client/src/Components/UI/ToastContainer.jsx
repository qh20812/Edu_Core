import React from 'react';
import { useUI } from '../../Hooks/useUI';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const Toast = ({ notification, onRemove }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="w-5 h-5" />;
      case 'error':
        return <FaTimesCircle className="w-5 h-5" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5" />;
      case 'info':
        return <FaInfoCircle className="w-5 h-5" />;
      default:
        return <FaInfoCircle className="w-5 h-5" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getIconStyles = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div
      className={`
        flex items-start p-4 border rounded-lg shadow-md max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        animate-slide-up hover:shadow-lg
        ${getStyles(notification.type)}
      `}
    >
      <div className={`flex-shrink-0 ${getIconStyles(notification.type)}`}>
        {getIcon(notification.type)}
      </div>
      
      <div className="ml-3 flex-1">
        {notification.title && (
          <p className="text-sm font-medium">
            {notification.title}
          </p>
        )}
        <p className="text-sm mt-1">
          {notification.message}
        </p>
      </div>
      
      <button
        onClick={() => onRemove(notification.id)}
        className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
      >
        <FaTimes className="w-4 h-4 opacity-50 hover:opacity-75" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { notifications, removeNotification } = useUI();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
