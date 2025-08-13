import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "Về chúng tôi", to: "/about" },
      { label: "Tin tức", to: "/news" },
      { label: "Tuyển dụng", to: "/careers" },
      { label: "Liên hệ", to: "/contact" },
    ],
    product: [
      { label: "Tính năng", to: "/#features" },
      { label: "Bảng giá", to: "/pricing" },
      { label: "Hướng dẫn", to: "/guide" },
      { label: "API", to: "/api" },
    ],
    support: [
  { label: "Hỗ trợ", to: "/support" },
  { label: "FAQ", to: "/faq" },
  { label: "Cộng đồng", to: "/community" },
  { label: "Blog", to: "/blog" },
    ],
    legal: [
      { label: "Điều khoản", to: "/terms" },
      { label: "Bảo mật", to: "/privacy" },
      { label: "Cookies", to: "/cookies" },
      { label: "GDPR", to: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <footer className="text-white bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Main Footer */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 space-x-3 group">
              <FaGraduationCap className="w-10 h-10 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                {`EduCore`}
              </span>
            </Link>
            
            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              Nền tảng giáo dục số hiện đại, kết nối giáo viên và học sinh trong một môi trường học tập thông minh và hiệu quả.
            </p>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="w-4 h-4 text-blue-400" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="w-4 h-4 text-blue-400" />
                <span>support@educore.vn</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                <span>{`Tp. Hồ Chí Minh, Việt Nam`}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-opacity-20`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Công ty</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 transition-colors duration-300 hover:text-blue-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Sản phẩm</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 transition-colors duration-300 hover:text-blue-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Hỗ trợ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 transition-colors duration-300 hover:text-blue-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Pháp lý</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 transition-colors duration-300 hover:text-blue-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="pt-8 mt-12 border-t border-gray-700">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="flex items-center mb-2 text-xl font-semibold text-white">
                <FaRocket className="w-5 h-5 mr-2 text-blue-400" />
                Đăng ký nhận tin tức
              </h3>
              <p className="text-gray-300">
                Nhận thông tin mới nhất về sản phẩm và các tính năng mới
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 text-blue-900 placeholder-gray-400 bg-white border border-gray-600 rounded-lg bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 font-semibold text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 whitespace-nowrap">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} EduCore. Tất cả quyền được bảo lưu.</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center">
                Được phát triển với
                <FaHeart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
                tại Việt Nam
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Phiên bản 1.0.0</span>
              <span>•</span>
              <Link to="/status" className="transition-colors hover:text-blue-400">
                Trạng thái hệ thống
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
