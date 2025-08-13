import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaRocket,
  FaArrowRight,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('./assets/images/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="relative inline-block mb-8 animate-fade-in-down">
              <span className="text-blue-200 text-sm font-medium px-6 py-3 bg-white bg-opacity-10 rounded-full border border-blue-200 border-opacity-20 backdrop-blur-sm">
                🎓 Nền tảng giáo dục thông minh
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                EduCore
              </span>
              <span className="block text-blue-300 mt-2 text-3xl lg:text-5xl">
                Học tập thông minh
              </span>
              <span className="block text-2xl lg:text-4xl text-blue-100 mt-2">
                Kiến tạo tương lai
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-2xl leading-relaxed animate-fade-in-up">
              Hệ thống quản lý học tập hiện đại, kết nối giáo viên, học sinh và phụ huynh trong một môi trường giáo dục số tiến tiến.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 lg:justify-start justify-center animate-fade-in-up">
              <Link
                to="/register"
                className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white bg-opacity-20 rounded-full group-hover:w-full group-hover:h-full"></span>
                <span className="relative flex items-center">
                  <FaRocket className="w-5 h-5 mr-2" />
                  Bắt đầu miễn phí
                  <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/tenant-register"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white border-opacity-80 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                <span className="flex items-center">
                  <FaGraduationCap className="w-5 h-5 mr-2" />
                  Đăng ký trường học
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-blue-300 border-opacity-20">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">1000+</div>
                <div className="text-blue-200 text-sm">Học sinh</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">Trường học</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">99%</div>
                <div className="text-blue-200 text-sm">Hài lòng</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
                <div className="text-center mb-6">
                  <FaGraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">Dashboard EduCore</h3>
                  <p className="text-gray-600">Giao diện quản lý thông minh</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FaCheck className="w-4 h-4 text-green-500 mr-3" />
                    <span>Quản lý lớp học trực tuyến</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCheck className="w-4 h-4 text-green-500 mr-3" />
                    <span>Theo dõi tiến độ học tập</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCheck className="w-4 h-4 text-green-500 mr-3" />
                    <span>Báo cáo chi tiết</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-3xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-white hover:text-blue-200 transition-colors">
          <FaChevronDown className="w-6 h-6" />
        </a>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none">
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
