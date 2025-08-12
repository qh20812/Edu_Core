import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";

const TenantRegistrationSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <FaCheckCircle className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Đăng ký thành công!
          </h1>
          <p className="text-green-100">
            Yêu cầu đăng ký trường học của bạn đã được gửi thành công
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FaCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Yêu cầu đã được tiếp nhận
                </h2>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Cảm ơn bạn đã quan tâm đến hệ thống quản lý giáo dục EduCore. 
                  Thông tin đăng ký của trường học đã được gửi đến bộ phận quản trị hệ thống.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
              <FaClock className="mr-2" />
              Các bước tiếp theo
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Xem xét và đánh giá
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Bộ phận quản trị sẽ xem xét thông tin và đánh giá yêu cầu của bạn
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Thông báo kết quả
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Bạn sẽ nhận được email thông báo kết quả trong vòng 1-3 ngày làm việc
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Kích hoạt tài khoản
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Sau khi được duyệt, tài khoản sẽ được kích hoạt và bạn có thể đăng nhập
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
              <FaEnvelope className="mr-2" />
              Thông tin quan trọng
            </h3>
            <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Vui lòng kiểm tra email (bao gồm cả thư mục spam) để nhận thông báo</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Lưu trữ thông tin đăng nhập để sử dụng sau khi tài khoản được kích hoạt</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Nếu có thắc mắc, vui lòng liên hệ bộ phận hỗ trợ</span>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Cần hỗ trợ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-600 text-lg" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Email hỗ trợ
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    support@educore.vn
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-green-600 text-lg" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Hotline
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1900 1234
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              to="/"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <FaHome />
              <span>Về trang chủ</span>
            </Link>
            <Link
              to="/login"
              className="flex-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 font-medium py-3 px-6 rounded-lg transition-all duration-200 text-center"
            >
              Đăng nhập (sau khi được duyệt)
            </Link>
          </div>

          {/* Timeline Reminder */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-slate-700">
            <p>
              <strong>Lưu ý:</strong> Thời gian xử lý có thể thay đổi tùy thuộc vào khối lượng công việc.
              Chúng tôi sẽ cố gắng phản hồi sớm nhất có thể.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRegistrationSuccessPage;
