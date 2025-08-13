import React, { useState } from 'react';
import { FaBuilding, FaChevronDown } from 'react-icons/fa';

const schoolTypes = {
  elementary: "Tiểu học",
  secondary: "Trung học cơ sở", 
  high_school: "Trung học phổ thông",
  university: "Đại học",
  vocational: "Dạy nghề",
  kindergarten: "Mẫu giáo",
};

const schoolTypeColors = {
  elementary: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
  secondary: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
  high_school: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700",
  university: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700",
  vocational: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
  kindergarten: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700",
};

const SchoolTypeDropdown = ({ 
  selectedType, 
  onTypeChange, 
  register 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type) => {
    onTypeChange(type);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Loại trường *
      </label>
      <div className="relative">
        <input {...register("schoolType")} type="hidden" value={selectedType} />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-left"
        >
          <span className={`px-3 py-1 rounded-full text-sm border ${schoolTypeColors[selectedType]}`}>
            {schoolTypes[selectedType]}
          </span>
        </button>
        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto">
            {Object.entries(schoolTypes).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-200 border-b border-gray-100 dark:border-slate-600 last:border-b-0"
              >
                <span className={`px-3 py-1 rounded-full text-sm border ${schoolTypeColors[key]}`}>
                  {value}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolTypeDropdown;
