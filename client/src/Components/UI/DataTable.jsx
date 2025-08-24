import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../Lib/utils';

const DataTable = ({ 
  columns, 
  data, 
  loading = false, 
  emptyMessage = "Không có dữ liệu",
  emptyIcon: EmptyIcon,
  className 
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className={cn(
        "overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700",
        className
      )}>
        <div className="p-8 text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('ui.loading', 'Đang tải...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700",
      className
    )}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.cell ? column.cell(row, rowIndex) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="py-12 text-center">
          {EmptyIcon && <EmptyIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />}
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {emptyMessage}
          </h3>
        </div>
      )}
    </div>
  );
};

export default DataTable;
