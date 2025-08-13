import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaChartLine,
  FaLaptopCode,
  FaShieldAlt,
  FaCloudUploadAlt,
  FaBrain,
  FaRocket,
  FaPlay,
  FaGraduationCap,
} from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      icon: FaUsers,
      title: "Quản lý lớp học",
      description: "Tạo và quản lý lớp học trực tuyến, tổ chức bài giảng, theo dõi sự tham gia của học sinh.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: FaChartLine,
      title: "Báo cáo thống kê",
      description: "Phân tích chi tiết tiến độ học tập, tạo báo cáo tự động cho giáo viên và phụ huynh.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      icon: FaLaptopCode,
      title: "Bài tập trực tuyến",
      description: "Hệ thống giao và chấm bài tập tự động, hỗ trợ nhiều định dạng câu hỏi khác nhau.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      icon: FaShieldAlt,
      title: "Bảo mật cao",
      description: "Bảo vệ dữ liệu người dùng với các tiêu chuẩn bảo mật quốc tế, tuân thủ GDPR.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    {
      icon: FaCloudUploadAlt,
      title: "Lưu trữ đám mây",
      description: "Truy cập tài liệu và bài học mọi lúc, mọi nơi với hệ thống lưu trữ đám mây.",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600"
    },
    {
      icon: FaBrain,
      title: "AI hỗ trợ",
      description: "Trí tuệ nhân tạo hỗ trợ cá nhân hóa việc học và đề xuất nội dung phù hợp.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-6 py-2 text-indigo-600 text-sm font-semibold tracking-wider uppercase mb-4 rounded-full bg-indigo-50 border border-indigo-100">
            <FaRocket className="w-4 h-4 mr-2" />
            Tính năng nổi bật
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tất cả những gì bạn cần cho
            <span className="block text-indigo-600 mt-2">giáo dục hiện đại</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
            <div className="w-24 h-1 bg-indigo-600 rounded-full"></div>
            <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            EduCore cung cấp bộ công cụ hoàn chỉnh để quản lý và nâng cao chất lượng giáo dục
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sẵn sàng bắt đầu hành trình giáo dục số?
            </h3>
            <p className="text-gray-600 mb-6">
              Tham gia cùng hàng nghìn giáo viên và học sinh đang sử dụng EduCore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                <FaPlay className="w-4 h-4 mr-2" />
                Dùng thử miễn phí
              </Link>
              <Link
                to="/tenant-register"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <FaGraduationCap className="w-4 h-4 mr-2" />
                Đăng ký trường học
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
