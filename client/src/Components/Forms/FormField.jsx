import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon: Icon,
  register,
  error,
  required = false,
  validation = {},
  className = '',
  children,
  ...props
}) => {
  const validationRules = {
    required: required ? `${label} là bắt buộc` : false,
    ...validation,
  };

  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && '*'}
      </label>
      <div className="relative">
        {children ? (
          children
        ) : (
          <input
            {...register(name, validationRules)}
            type={type}
            className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
              error
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-slate-600'
            }`}
            placeholder={placeholder}
            {...props}
          />
        )}
        {Icon && (
          <Icon className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        )}
      </div>
      {error && (
        <div className="flex items-center mt-2 text-sm text-red-600">
          <FaExclamationCircle className="w-4 h-4 mr-1" />
          {error.message}
        </div>
      )}
    </div>
  );
};

export default FormField;
