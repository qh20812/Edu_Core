import React from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const BlogGrid = () => {
  const tips = [
    {
      title: "5 mẹo giúp học nhanh nhớ lâu",
      summary:
        "Áp dụng kỹ thuật Pomodoro, ghi chú hiệu quả và học xen kẽ để tăng hiệu suất học tập.",
      date: "20/07/2025",
      tag: "Ghi nhớ",
      readTime: "5 phút đọc",
      category: "study-tips",
    },
    {
      title: "Cách tạo môi trường học tập tối ưu",
      summary:
        "Lựa chọn không gian yên tĩnh, ánh sáng phù hợp và công cụ hỗ trợ tốt nhất cho việc học.",
      date: "15/07/2025",
      tag: "Không gian học",
      readTime: "7 phút đọc",
      category: "environment",
    },
    {
      title: "Tự học thông minh: Dùng AI như thế nào?",
      summary:
        "Kết hợp AI tutor, ứng dụng luyện tập thông minh và đánh giá tiến độ để cá nhân hoá việc học.",
      date: "10/07/2025",
      tag: "AI học tập",
      readTime: "10 phút đọc",
      category: "technology",
    },
    {
      title: "Quản lý thời gian học tập hiệu quả",
      summary:
        "Lập kế hoạch học tập khoa học, chia nhỏ mục tiêu và theo dõi tiến độ để đạt kết quả tốt nhất.",
      date: "05/07/2025",
      tag: "Quản lý thời gian",
      readTime: "6 phút đọc",
      category: "time-management",
    },
    {
      title: "Kỹ thuật ghi nhớ từ vựng ngoại ngữ",
      summary:
        "Phương pháp spaced repetition, flashcard thông minh và ngữ cảnh thực tế để nhớ từ vựng lâu dài.",
      date: "01/07/2025",
      tag: "Ngoại ngữ",
      readTime: "8 phút đọc",
      category: "language",
    },
    {
      title: "Làm việc nhóm hiệu quả trong học tập",
      summary:
        "Chiến lược phân chia công việc, giao tiếp nhóm và sử dụng công cụ hỗ trợ cho học tập nhóm.",
      date: "28/06/2025",
      tag: "Học nhóm",
      readTime: "9 phút đọc",
      category: "teamwork",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "study-tips": "bg-blue-100 text-blue-700 border-blue-200",
      environment: "bg-green-100 text-green-700 border-green-200",
      technology: "bg-purple-100 text-purple-700 border-purple-200",
      "time-management": "bg-orange-100 text-orange-700 border-orange-200",
      language: "bg-pink-100 text-pink-700 border-pink-200",
      teamwork: "bg-teal-100 text-teal-700 border-teal-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bài viết mới nhất
          </h2>
          <p className="text-gray-600">
            Khám phá những kiến thức và kỹ năng học tập hữu ích
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <article
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                    tip.category
                  )}`}
                >
                  {tip.tag}
                </span>
                <span className="text-xs text-gray-500">
                  {tip.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                {tip.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {tip.summary}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="w-4 h-4 mr-1" />
                  {tip.date}
                </div>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Đọc thêm
                  <FaArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl">
            Xem thêm bài viết
            <FaArrowRight className="w-5 h-5 ml-2 rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
