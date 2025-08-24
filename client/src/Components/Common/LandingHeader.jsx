import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuthQueries";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../Layouts/Navbar";
import AuthButtons from "../Layouts/AuthButtons";
import MobileMenu from "../Layouts/MobileMenu";

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
          <Navbar navItems={navItems} />

          {/* Auth Buttons */}
          <AuthButtons user={user} handleLogout={handleLogout} />

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
          <MobileMenu 
            navItems={navItems}
            user={user}
            handleLogout={handleLogout}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
