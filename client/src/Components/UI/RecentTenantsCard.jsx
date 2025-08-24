import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import StatusBadge from './StatusBadge';

const LoadingSkeleton = ({ count = 3 }) => (
  [...Array(count)].map((_, index) => (
    <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-700 animate-pulse">
      <div>
        <div className="w-32 h-4 mb-2 bg-gray-200 rounded dark:bg-gray-600"></div>
        <div className="w-20 h-3 bg-gray-200 rounded dark:bg-gray-600"></div>
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded dark:bg-gray-600"></div>
    </div>
  ))
);

const TenantItem = ({ tenant, showUsers = true }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{tenant.name}</p>
        {showUsers && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tenant.totalUsers || 0} {t('systemDashboard.users')}
          </p>
        )}
      </div>
      <StatusBadge status={tenant.status} />
    </div>
  );
};

const RecentTenantsCard = ({ 
  tenants = [], 
  loading = false, 
  title,
  emptyMessage,
  className,
  showUsers = true,
  maxItems = null 
}) => {
  const { t } = useTranslation();

  const displayTitle = title || t('systemDashboard.recentSchools');
  const displayEmptyMessage = emptyMessage || t('systemDashboard.noRecentSchools');
  const displayTenants = maxItems ? tenants.slice(0, maxItems) : tenants;

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
      
      <div className="space-y-3">
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : displayTenants.length > 0 ? (
          displayTenants.map((tenant, index) => (
            <TenantItem 
              key={tenant.id || index} 
              tenant={tenant} 
              showUsers={showUsers}
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

export default RecentTenantsCard;
