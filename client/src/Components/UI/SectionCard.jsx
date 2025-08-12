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
        'p-6 bg-white rounded-xl shadow-xl border border-gray-100',
        'dark:bg-slate-800 dark:border-slate-700',
        'transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10',
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
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20">
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
