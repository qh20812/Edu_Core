import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../Lib/utils';

const HealthLoadingSkeleton = ({ count = 4 }) => (
  [...Array(count)].map((_, index) => (
    <div key={index} className="flex items-center justify-between animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        <div className="w-24 h-4 bg-gray-200 rounded dark:bg-gray-600"></div>
      </div>
      <div className="w-12 h-3 bg-gray-200 rounded dark:bg-gray-600"></div>
    </div>
  ))
);

const HealthServiceItem = ({ service }) => {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get service name translation
  const getServiceName = (serviceName) => {
    // First try systemDashboard namespace
    const systemKey = `systemDashboard.${serviceName}`;
    const systemTranslated = t(systemKey);
    if (systemTranslated !== systemKey) return systemTranslated;
    
    // Then try ui namespace
    const uiKey = `ui.services.${serviceName}`;
    const uiTranslated = t(uiKey);
    if (uiTranslated !== uiKey) return uiTranslated;
    
    // Fallback to original service name
    return serviceName;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={cn('w-3 h-3 rounded-full', getStatusColor(service.status))}></div>
        <span className="text-gray-900 dark:text-white">
          {getServiceName(service.service)}
        </span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {service.uptime}
      </span>
    </div>
  );
};

const SystemHealthCard = ({ 
  services = [], 
  loading = false, 
  title,
  className,
  emptyMessage 
}) => {
  const { t } = useTranslation();

  const displayTitle = title || t('systemDashboard.systemHealth');
  const displayEmptyMessage = emptyMessage || t('systemDashboard.noHealthData');

  return (
    <div className={cn(
      "p-6 rounded-lg border transition-all duration-300",
      "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600", 
      "shadow-lg hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl",
      "hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20",
      className
    )}>
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        {displayTitle}
      </h2>
      
      <div className="space-y-4">
        {loading ? (
          <HealthLoadingSkeleton count={4} />
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <HealthServiceItem 
              key={service.id || service.service || index} 
              service={service} 
            />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            {displayEmptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemHealthCard;
