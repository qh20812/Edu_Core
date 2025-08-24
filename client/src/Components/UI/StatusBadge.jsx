import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../Lib/utils';

const StatusBadge = ({ 
  status, 
  variant = 'auto', 
  size = 'sm',
  className,
  children,
  translate = true
}) => {
  const { t } = useTranslation();

  // Auto-detect variant based on status if not provided
  const getVariant = () => {
    if (variant !== 'auto') return variant;
    
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('active') || statusLower.includes('healthy') || statusLower.includes('online') || statusLower.includes('success')) {
      return 'success';
    }
    if (statusLower.includes('pending') || statusLower.includes('warning')) {
      return 'warning';
    }
    if (statusLower.includes('error') || statusLower.includes('inactive') || statusLower.includes('offline') || statusLower.includes('failed')) {
      return 'danger';
    }
    if (statusLower.includes('info') || statusLower.includes('processing')) {
      return 'info';
    }
    return 'gray';
  };

  const currentVariant = getVariant();

  // Get translated text for status
  const getDisplayText = () => {
    if (children) return children;
    if (!status) return 'N/A';
    if (!translate) return status;
    
    // Try to get translation from ui.statusBadge first, fallback to original status
    const translationKey = `ui.statusBadge.${status?.toLowerCase()}`;
    const translated = t(translationKey);
    
    // If translation key doesn't exist, return original status with proper formatting
    return translated === translationKey ? 
      (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()) : 
      translated;
  };

  const variantStyles = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      variantStyles[currentVariant],
      sizeStyles[size],
      className
    )}>
      {getDisplayText()}
    </span>
  );
};

export default StatusBadge;
