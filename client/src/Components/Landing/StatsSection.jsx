import React from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaSchool, FaTrophy } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: FaGraduationCap,
      number: "10,000+",
      label: "Học sinh đang học",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: FaChalkboardTeacher,
      number: "500+",
      label: "Giáo viên",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      icon: FaSchool,
      number: "50+",
      label: "Trường học",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      icon: FaTrophy,
      number: "95%",
      label: "Mức độ hài lòng",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Con số ấn tượng
            <span className="block text-blue-200 mt-2">tại EduCore</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
            <div className="w-24 h-1 bg-white rounded-full"></div>
            <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Những con số này là minh chứng cho sự tin tưởng và thành công của cộng đồng EduCore
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                {stat.number}
              </div>
              <div className="text-blue-100 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tham gia cộng đồng EduCore ngay hôm nay!
            </h3>
            <p className="text-blue-100 mb-6">
              Hàng nghìn người đã tin tưởng và sử dụng EduCore để nâng cao chất lượng giáo dục
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-white ml-4">
                  <div className="text-sm">+10,000 người dùng</div>
                  <div className="text-xs text-blue-200">đang tin tưởng EduCore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
