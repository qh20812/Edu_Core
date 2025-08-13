import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    alert("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi những bài viết mới nhất đến email của bạn.");
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Đăng ký nhận thông báo
          </h3>
          <p className="text-gray-600 mb-8">
            Nhận những bài viết mới nhất về học tập và giáo dục ngay trong hộp
            thư của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button 
            type="submit"
            disabled={isSubscribing}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-300 flex items-center justify-center"
          >
            {isSubscribing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang đăng ký...
              </>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
