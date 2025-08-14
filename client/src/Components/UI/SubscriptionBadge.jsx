import React from 'react';
import { FaCrown, FaStar, FaGem } from 'react-icons/fa';

const SubscriptionBadge = ({ subscription, className = '' }) => {
  if (!subscription) return null;

  const getSubscriptionConfig = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'small':
        return {
          name: 'Gói Cơ Bản',
          icon: <FaStar className="w-3 h-3" />,
          bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
          textColor: 'text-white',
          animation: 'animate-pulse',
          shadowColor: 'shadow-green-300'
        };
      case 'medium':
        return {
          name: 'Gói Nâng Cao',
          icon: <FaGem className="w-3 h-3" />,
          bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
          textColor: 'text-white',
          animation: 'animate-sparkle',
          shadowColor: 'shadow-blue-300'
        };
      case 'large':
        return {
          name: 'Gói Cao Cấp',
          icon: <FaCrown className="w-3 h-3" />,
          bgColor: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
          textColor: 'text-white',
          animation: 'animate-glow',
          shadowColor: 'shadow-yellow-300'
        };
      default:
        return {
          name: 'Gói Miễn Phí',
          icon: <FaStar className="w-3 h-3" />,
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          animation: '',
          shadowColor: 'shadow-gray-200'
        };
    }
  };

  const config = getSubscriptionConfig(subscription.plan);

  return (
    <div 
      className={`
        inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
        ${config.bgColor} ${config.textColor} ${config.animation} ${config.shadowColor}
        shadow-md ${className}
      `}
    >
      {config.icon}
      <span>{config.name}</span>
    </div>
  );
};

export default SubscriptionBadge;
