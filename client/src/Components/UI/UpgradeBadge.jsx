import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaCrown } from 'react-icons/fa';

const UpgradeBadge = ({ subscription, className = '' }) => {
  // Không hiển thị nếu đã có gói cao cấp nhất
  if (subscription && subscription.plan === 'large') return null;

  return (
    <Link 
      to="/pricing"
      className={`
        inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium
        bg-gradient-to-r from-orange-400 to-red-500 text-white
        hover:from-orange-500 hover:to-red-600 transition-all duration-300
        shadow-md hover:shadow-lg transform hover:scale-105
        animate-pulse hover:animate-none ${className}
      `}
    >
      <FaCrown className="w-3 h-3" />
      <span>Nâng cấp</span>
      <FaArrowUp className="w-3 h-3" />
    </Link>
  );
};

export default UpgradeBadge;
