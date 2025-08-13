import React from 'react';

const FormSection = ({ 
  title, 
  icon: Icon, 
  children, 
  className = "" 
}) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        {Icon && <Icon className="mr-3 text-blue-600" />}
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormSection;
