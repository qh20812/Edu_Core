import React from 'react';
import clsx from 'clsx';

const ListItem = ({ 
  title, 
  subtitle, 
  meta, 
  icon, 
  status, 
  actions, 
  className,
  onClick,
  ...props 
}) => {
  return (
    <div 
      className={clsx(
        'flex items-center justify-between p-4 rounded-lg transition-all duration-200',
        'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-md',
        'dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Left side - Icon + Content */}
      <div className="flex items-center flex-1 space-x-3">
        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600">
              {icon}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {title}
          </p>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
              {subtitle}
            </p>
          )}
          
          {/* Meta info */}
          {meta && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              {meta}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Status + Actions */}
      <div className="flex items-center flex-shrink-0 space-x-3">
        {/* Status */}
        {status && (
          <div className="flex items-center">
            {status.type === 'badge' && (
              <span className={clsx(
                'px-2 py-1 rounded text-xs font-medium',
                status.variant === 'success' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                status.variant === 'warning' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                status.variant === 'danger' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                status.variant === 'info' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                status.variant === 'primary' && 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
              )}>
                {status.label}
              </span>
            )}
            
            {status.type === 'dot' && (
              <div className="flex items-center space-x-2">
                <div className={clsx(
                  'w-3 h-3 rounded-full',
                  status.variant === 'success' && 'bg-green-500',
                  status.variant === 'warning' && 'bg-yellow-500',
                  status.variant === 'danger' && 'bg-red-500',
                  status.variant === 'info' && 'bg-blue-500'
                )}></div>
                {status.label && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {status.label}
                  </span>
                )}
              </div>
            )}
            
            {status.type === 'text' && (
              <span className={clsx(
                'text-sm font-medium',
                status.variant === 'success' && 'text-success',
                status.variant === 'warning' && 'text-warning',
                status.variant === 'danger' && 'text-danger',
                status.variant === 'info' && 'text-info',
                status.variant === 'primary' && 'text-primary'
              )}>
                {status.label}
              </span>
            )}
          </div>
        )}
        
        {/* Actions */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
