import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { cn } from '../../Lib/utils';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-lg p-6 w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl",
        sizeClasses[size],
        className
      )}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-150 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
