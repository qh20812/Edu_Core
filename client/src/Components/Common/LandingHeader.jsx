import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSchool,
} from "react-icons/fa";

const LandingHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "Trang chủ", to: "/", external: false },
    { label: "Về chúng tôi", to: "/about", external: false },
    { label: "Tính năng", to: "/#features", external: false },
    { label: "Liên hệ", to: "/contact", external: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <FaGraduationCap className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              {`EduCore`}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="relative font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 transition-colors duration-300 md:hidden hover:text-blue-600"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
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
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
