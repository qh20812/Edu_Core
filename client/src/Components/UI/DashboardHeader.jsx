import React from 'react';
import { cn } from '../../lib/utils';

const DashboardHeader = ({ 
  title, 
  subtitle, 
  actions = [], 
  className,
  titleClassName,
  subtitleClassName 
}) => {

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h1 className={cn(
          "text-5xl font-bold text-blue-600 text-shadow-2xs",
          titleClassName
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            "mt-1 text-gray-600 dark:text-gray-400",
            subtitleClassName
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      {actions.length > 0 && (
        <div className="flex space-x-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "px-4 py-2 text-white transition-colors rounded-lg",
                action.variant === 'secondary' 
                  ? "bg-secondary hover:bg-secondary/90" 
                  : "bg-primary hover:bg-primary/90",
                action.disabled && "opacity-50 cursor-not-allowed",
                action.className
              )}
            >
              {action.icon && <span className="inline mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
