import React from 'react';
import clsx from 'clsx';

const SectionCard = ({ 
  title, 
  subtitle, 
  children, 
  icon, 
  actions, 
  className,
  titleClassName,
  contentClassName,
  ...props 
}) => {
  return (
    <div 
      className={clsx(
        'p-6 rounded-xl border transition-all duration-300',
        'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:shadow-blue-100/50',
        'dark:bg-gray-800 dark:border-gray-600 dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20',
        'backdrop-blur-sm',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
                {icon}
              </div>
            )}
            <div>
              <h2 className={clsx(
                'text-2xl font-bold text-blue-600 dark:text-blue-400',
                titleClassName
              )}>
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {/* Decorative line */}
        <div className="w-16 h-1 rounded-full shadow-sm bg-gradient-to-r from-primary to-blue-600"></div>
      </div>

      {/* Content */}
      <div className={clsx('space-y-4', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
