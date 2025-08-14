import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaSchool } from "react-icons/fa";

const AuthButtons = ({ user, handleLogout }) => {
  return (
    <div className="items-center hidden space-x-4 md:flex">
      {user ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/"
            className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            <FaUser className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-300 hover:text-red-600"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            <FaSignInAlt className="w-4 h-4" />
            <span>Đăng nhập</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <FaUserPlus className="w-4 h-4" />
            <span>Đăng ký</span>
          </Link>
          <Link
            to="/tenant-register"
            className="flex items-center px-4 py-2 space-x-2 font-medium text-blue-600 transition-colors duration-300 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            <FaSchool className="w-4 h-4" />
            <span>Trường học</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
