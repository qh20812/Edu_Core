import React from 'react';

// Loading Spinner Component
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} border-2 border-gray-200 border-t-primary rounded-full animate-spin`}></div>
  );
};

// Table Loading Skeleton
export const TableLoadingSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              {[...Array(columns)].map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Card Loading Skeleton
export const CardLoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
          <div className="h-6 mb-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Stats Loading Skeleton
export const StatsLoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="w-20 h-3 mb-2 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// List Loading Skeleton
export const ListLoadingSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 mb-2 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div>
              <div className="w-3/4 h-3 mb-1 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div>
            </div>
            <div className="ml-4">
              <div className="w-16 h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Button Loading State
export const LoadingButton = ({ 
  loading, 
  children, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={`relative flex items-center justify-center ${className} ${
        loading || disabled ? 'opacity-75 cursor-not-allowed' : ''
      }`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <Spinner size="sm" className="mr-2" />
      )}
      {children}
    </button>
  );
};

// Full Page Loading
export const FullPageLoading = ({ message = 'Đang tải...' }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};

// Inline Loading
export const InlineLoading = ({ message = 'Đang tải...', size = 'sm' }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <Spinner size={size} className="mr-2" />
      <span className="text-gray-600 dark:text-gray-400">{message}</span>
    </div>
  );
};

export default {
  Spinner,
  TableLoadingSkeleton,
  CardLoadingSkeleton,
  StatsLoadingSkeleton,
  ListLoadingSkeleton,
  LoadingButton,
  FullPageLoading,
  InlineLoading
};
