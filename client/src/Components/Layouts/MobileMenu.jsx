import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaSchool } from "react-icons/fa";

const MobileMenu = ({ navItems, user, handleLogout, setIsMenuOpen }) => (
  <div className="py-4 border-t border-gray-200 md:hidden">
    <nav className="flex flex-col space-y-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className="px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
      <div className="pt-4 mt-4 border-t border-gray-200">
        {user ? (
          <div className="space-y-2">
            <Link
              to="/dashboard/"
              className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 space-x-2 font-medium text-left text-gray-700 transition-colors duration-300 hover:text-red-600"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              to="/login"
              className="flex items-center px-4 py-2 space-x-2 font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSignInAlt className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center px-4 py-2 mx-4 space-x-2 font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserPlus className="w-4 h-4" />
              <span>Đăng ký</span>
            </Link>
            <Link
              to="/tenant-register"
              className="flex items-center px-4 py-2 mx-4 space-x-2 font-medium text-blue-600 transition-colors duration-300 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSchool className="w-4 h-4" />
              <span>Trường học</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  </div>
);

export default MobileMenu;
