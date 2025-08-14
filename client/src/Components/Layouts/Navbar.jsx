import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ navItems }) => {
  return (
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
  );
};

export default Navbar;
