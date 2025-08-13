import React, { useState } from "react";
import { FaUser, FaChevronDown } from "react-icons/fa";

const roleLabels = {
  student: "Học sinh",
  teacher: "Giáo viên", 
  parent: "Phụ huynh",
};

const roleColors = {
  teacher:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
  student:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
  parent:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
};

const RoleDropdown = ({ 
  label, 
  selectedRole, 
  onRoleChange, 
  t 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <label className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-4 text-lg transition-all duration-200 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <div className="flex items-center">
            <FaUser className="w-6 h-6 mr-3 text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">
              {roleLabels[selectedRole]}
            </span>
            <span
              className={`ml-3 px-3 py-1 text-sm rounded-full border ${roleColors[selectedRole]}`}
            >
              {t(`roles.${selectedRole}`)}
            </span>
          </div>
          <FaChevronDown
            className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 overflow-hidden bg-white border border-gray-300 shadow-lg dark:bg-gray-700 dark:border-gray-600 rounded-xl">
            {Object.entries(roleLabels).map(([role, label]) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  onRoleChange(role);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-between ${
                  selectedRole === role
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                <span className="text-lg">{label}</span>
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${roleColors[role]}`}
                >
                  {t(`roles.${role}`)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleDropdown;
