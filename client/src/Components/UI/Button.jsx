import React from "react";
import clsx from "clsx";

// children là nội dung text hoặc icon bên trong button
// ...otherProps là bao gồm tất cả các props khác như onclick, type, disabled
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  ...otherProps
}) => {
  // NOTE: Sử dụng màu custom đã định nghĩa trong tailwind.config.js
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-800 dark:disabled:bg-gray-500",
    accent: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:active:bg-indigo-800",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 disabled:bg-yellow-400 disabled:cursor-not-allowed dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:active:bg-yellow-800",
    outline: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 disabled:border-blue-400 disabled:text-blue-400 disabled:cursor-not-allowed dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600",
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const finalClassName = clsx(
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size],
    className
  );
  
  return (
    <button {...otherProps} className={finalClassName} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
