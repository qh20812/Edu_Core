import React from "react";
import LandingHeader from "../../Components/Common/LandingHeader";
import LandingFooter from "../../Components/Common/LandingFooter";
import {
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaHandshake,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      role: "CEO & Founder",
      description: "10+ năm kinh nghiệm trong lĩnh vực công nghệ giáo dục",
      image: "/images/team/ceo.jpg"
    },
    {
      name: "Trần Thị B",
      role: "CTO",
      description: "Chuyên gia phát triển phần mềm với 8+ năm kinh nghiệm",
      image: "/images/team/cto.jpg"
    },
    {
      name: "Lê Văn C",
      role: "Head of Product",
      description: "Chuyên gia thiết kế sản phẩm và trải nghiệm người dùng",
      image: "/images/team/head-product.jpg"
    },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Tận tâm",
      description: "Chúng tôi luôn đặt người học làm trung tâm trong mọi quyết định",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: FaLightbulb,
      title: "Sáng tạo",
      description: "Không ngừng đổi mới để mang đến trải nghiệm học tập tốt nhất",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: FaHandshake,
      title: "Hợp tác",
      description: "Xây dựng cộng đồng giáo dục mạnh mẽ thông qua sự hợp tác",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: FaGlobe,
      title: "Toàn cầu",
      description: "Kết nối giáo dục Việt Nam với thế giới thông qua công nghệ",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
                Về <span className="text-blue-600">EduCore</span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
                Chúng tôi là đội ngũ đam mê giáo dục và công nghệ, cam kết mang đến những giải pháp học tập hiện đại và hiệu quả nhất cho cộng đồng giáo dục Việt Nam.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                  Sứ mệnh của chúng tôi
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  EduCore được sinh ra với sứ mệnh cải thiện chất lượng giáo dục thông qua công nghệ. Chúng tôi tin rằng mỗi học sinh đều xứng đáng có được cơ hội học tập tốt nhất, và giáo viên cần có những công cụ hiện đại để thực hiện sứ mệnh giáo dục của mình.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-center">
                    <FaUsers className="w-8 h-8 mr-3 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1000+</div>
                      <div className="text-gray-600">Học sinh</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="w-8 h-8 mr-3 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">50+</div>
                      <div className="text-gray-600">Trường học</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="p-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl">
                  <FaRocket className="w-24 h-24 mx-auto mb-6 text-blue-600" />
                  <h3 className="mb-4 text-2xl font-bold text-center text-gray-800">
                    Tương lai giáo dục
                  </h3>
                  <p className="text-center text-gray-600">
                    Kết nối công nghệ và con người để tạo nên trải nghiệm học tập tuyệt vời
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                Giá trị cốt lõi
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Những giá trị này định hướng mọi hoạt động của chúng tôi và là nền tảng cho sự phát triển bền vững
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="p-6 text-center transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                Đội ngũ của chúng tôi
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Những con người đam mê và tài năng đang xây dựng tương lai giáo dục
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-6 text-center transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200">
                    <FaUsers className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-3 font-semibold text-blue-600">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
              Tham gia cùng chúng tôi
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Cùng xây dựng tương lai giáo dục Việt Nam với EduCore
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/register"
                className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl group hover:scale-105 hover:shadow-blue-500/25">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-xl bg-opacity-20 group-hover:w-full group-hover:h-full"></span>
                <span className="relative flex items-center">
                  <FaRocket className="w-5 h-5 mr-2" />
                  Bắt đầu
                  <FaArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <LandingFooter />
    </div>
  );
};

export default AboutPage;