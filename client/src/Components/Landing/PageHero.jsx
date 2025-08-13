import React from "react";

const PageHero = ({ 
  badge, 
  badgeIcon: BadgeIcon, 
  title, 
  subtitle, 
  bgClass = "bg-gradient-to-br from-blue-50 to-indigo-100" 
}) => {
  return (
    <section className={`relative ${bgClass} py-20`}>
      <div className="absolute inset-0 bg-[url('./assets/images/grid-pattern.svg')] opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {badge && (
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2" />}
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 bg-blue-200 rounded-full"></div>
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
            <div className="w-12 h-1 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
