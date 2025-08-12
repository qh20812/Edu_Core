import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  variant = 'primary', 
  loading = false, 
  onClick,
  className 
}) => {
  const { t } = useTranslation();
  // Color variants for different card types with enhanced gradients and styling
  const colorVariants = {
    primary: {
      background: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-700',
      shadow: 'shadow-blue-100 dark:shadow-blue-900/20'
    },
    secondary: {
      background: 'bg-gradient-to-br from-gray-500 to-gray-600',
      iconBg: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/30',
      iconColor: 'text-gray-600 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-700',
      shadow: 'shadow-gray-100 dark:shadow-gray-900/20'
    },
    accent: {
      background: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      iconBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-700',
      shadow: 'shadow-indigo-100 dark:shadow-indigo-900/20'
    },
    success: {
      background: 'bg-gradient-to-br from-emerald-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-800/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-700',
      shadow: 'shadow-emerald-100 dark:shadow-emerald-900/20'
    },
    warning: {
      background: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      iconBg: 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-800/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-700',
      shadow: 'shadow-amber-100 dark:shadow-amber-900/20'
    },
    danger: {
      background: 'bg-gradient-to-br from-red-500 to-rose-600',
      iconBg: 'bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/30',
      iconColor: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-700',
      shadow: 'shadow-red-100 dark:shadow-red-900/20'
    },
    info: {
      background: 'bg-gradient-to-br from-cyan-500 to-sky-600',
      iconBg: 'bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-800/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-200 dark:border-cyan-700',
      shadow: 'shadow-cyan-100 dark:shadow-cyan-900/20'
    },
    purple: {
      background: 'bg-gradient-to-br from-purple-500 to-violet-600',
      iconBg: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-700',
      shadow: 'shadow-purple-100 dark:shadow-purple-900/20'
    },
    pink: {
      background: 'bg-gradient-to-br from-pink-500 to-rose-600',
      iconBg: 'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-800/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-200 dark:border-pink-700',
      shadow: 'shadow-pink-100 dark:shadow-pink-900/20'
    },
    orange: {
      background: 'bg-gradient-to-br from-orange-500 to-red-600',
      iconBg: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-700',
      shadow: 'shadow-orange-100 dark:shadow-orange-900/20'
    }
  };

  const colors = colorVariants[variant] || colorVariants.primary;

  return (
    <div 
      className={clsx(
        'relative p-6 bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300',
        'shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105',
        colors.border,
        colors.shadow,
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      {/* Subtle background gradient overlay */}
      <div className={clsx(
        'absolute inset-0 rounded-2xl opacity-3',
        colors.background
      )}></div>
      
      <div className="relative flex items-center space-x-5">
        {/* Enhanced Icon Section */}
        <div className={clsx(
          'flex items-center justify-center w-18 h-18 rounded-2xl shadow-lg',
          colors.iconBg
        )}>
          <div className={clsx('text-3xl transition-transform duration-300 hover:scale-110', colors.iconColor)}>
            {icon}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <p className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {title}
          </p>
          {loading ? (
            <div className="w-24 rounded-lg h-9 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900 truncate dark:text-gray-100">
              {value}
            </p>
          )}
          
          {/* Optional subtitle or trend indicator */}
          <div className="flex items-center mt-2 space-x-2">
            <div className={clsx(
              'w-2 h-2 rounded-full animate-pulse',
              colors.background
            )}></div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
                {loading ? t('common.loading') : t('common.update')}
            </span>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={clsx(
        'absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 hover:opacity-5',
        colors.background
      )}></div>
      
      {/* Enhanced border glow on hover */}
      <div className={clsx(
        'absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 hover:opacity-20',
        'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800',
        colors.border.replace('border-', 'ring-')
      )}></div>
    </div>
  );
};

export default StatCard;
