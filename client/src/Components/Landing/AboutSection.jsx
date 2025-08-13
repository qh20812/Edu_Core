import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight, FaGraduationCap, FaLightbulb } from "react-icons/fa";

const AboutSection = () => {
  const highlights = [
    "Giao diện thân thiện và dễ sử dụng",
    "Tích hợp AI thông minh",
    "Hỗ trợ đa nền tảng",
    "Báo cáo chi tiết và analytics",
    "Bảo mật dữ liệu cao cấp",
    "Hỗ trợ 24/7 từ đội ngũ chuyên nghiệp"
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center px-6 py-2 text-indigo-600 text-sm font-semibold tracking-wider uppercase mb-4 rounded-full bg-indigo-50 border border-indigo-100">
                <FaLightbulb className="w-4 h-4 mr-2" />
                Về chúng tôi
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Sứ mệnh của chúng tôi
                <span className="block text-indigo-600 mt-2">là cách mạng hóa giáo dục</span>
              </h2>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
                <div className="w-24 h-1 bg-indigo-600 rounded-full"></div>
                <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Tại EduCore, chúng tôi tin rằng giáo dục là chìa khóa để mở ra tương lai tươi sáng. 
                Với sự kết hợp hoàn hảo giữa công nghệ tiên tiến và phương pháp giảng dạy hiện đại, 
                chúng tôi tạo ra một nền tảng học tập toàn diện.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Từ năm 2024, EduCore đã đồng hành cùng hàng nghìn giáo viên và học sinh trên khắp 
                Việt Nam, mang đến trải nghiệm học tập tốt nhất và hiệu quả cao.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                <FaGraduationCap className="w-5 h-5 mr-3" />
                Bắt đầu ngay hôm nay
                <FaArrowRight className="w-4 h-4 ml-3" />
              </Link>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="space-y-8">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="h-full bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <FaGraduationCap className="w-16 h-16 text-indigo-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Giáo dục thông minh
                  </h3>
                  <p className="text-gray-600">
                    Nền tảng học tập hiện đại với công nghệ AI tiên tiến
                  </p>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">10K+</div>
                  <div className="text-sm text-gray-600">Học sinh</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Giáo viên</div>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-gray-900 mb-2">Đổi mới sáng tạo</h4>
                <p className="text-sm text-gray-600">
                  Luôn cập nhật công nghệ mới nhất để phục vụ giáo dục
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <h4 className="font-bold text-gray-900 mb-2">Chất lượng cao</h4>
                <p className="text-sm text-gray-600">
                  Cam kết mang đến trải nghiệm học tập tốt nhất
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
