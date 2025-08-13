import React, { useState } from "react";
import LandingHeader from "../../Components/Common/LandingHeader";
import LandingFooter from "../../Components/Common/LandingFooter";
import PageHero from "../../Components/Landing/PageHero";
import { FaDollarSign, FaCheck, FaPhone, FaEnvelope } from "react-icons/fa";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly

  const plans = [
    {
      id: "small",
      range: "Dưới 300 học sinh",
      monthlyPrice: 3000000,
      yearlyPrice: 28800000,
      popular: false,
      description: "Phù hợp cho các trường học nhỏ và trung tâm giáo dục",
      maxStudents: 300,
      color: "blue",
    },
    {
      id: "medium",
      range: "301–700 học sinh",
      monthlyPrice: 5000000,
      yearlyPrice: 48000000,
      popular: true,
      description: "Lựa chọn phổ biến cho các trường trung học",
      maxStudents: 700,
      color: "indigo",
    },
    {
      id: "large",
      range: "701–900 học sinh",
      monthlyPrice: 7000000,
      yearlyPrice: 67200000,
      popular: false,
      description: "Dành cho các trường học lớn và tổ hợp giáo dục",
      maxStudents: 900,
      color: "purple",
    },
  ];

  const features = [
    {
      title: "Học sinh dùng đầy đủ tính năng không giới hạn",
      icon: "👨‍🎓",
    },
    {
      title: "Giáo viên có toàn quyền tạo đề thi, bài tập và xem báo cáo",
      icon: "👩‍🏫",
    },
    {
      title: "Quản trị viên quản lý trường học, dashboard và thống kê tổng quan",
      icon: "📊",
    },
    {
      title: "Phụ huynh truy cập miễn phí bằng mã học sinh",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Tích hợp công nghệ mới: AI Tutor, cá nhân hóa lộ trình học",
      icon: "🤖",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const calculateSavings = (monthly, yearly) => {
    const yearlyCost = monthly * 12;
    const savings = yearlyCost - yearly;
    const percentage = Math.round((savings / yearlyCost) * 100);
    return { savings, percentage };
  };

  const handleSelectPlan = (planId) => {
    // Redirect to tenant registration with selected plan
    const plan = plans.find(p => p.id === planId);
    const queryParams = new URLSearchParams({
      plan: planId,
      billing: billingCycle,
      price: billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
      maxStudents: plan.maxStudents
    });
    
    window.location.href = `/tenant-register?${queryParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <PageHero
          badge="Bảng giá dịch vụ"
          badgeIcon={FaDollarSign}
          title="Gói dịch vụ linh hoạt"
          subtitle="Các gói dịch vụ được thiết kế phù hợp theo quy mô học sinh của trường bạn, đảm bảo hiệu quả và tiết kiệm chi phí."
          bgClass="bg-gradient-to-br from-green-50 to-blue-50"
        />

        <section className="py-16">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Thanh toán hàng tháng
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    billingCycle === "yearly"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Thanh toán hàng năm
                  <span className="px-2 py-1 ml-2 text-xs text-green-600 bg-green-100 rounded-full">
                    Tiết kiệm 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-3">
              {plans.map((plan) => {
                const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
                const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);
                
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${
                      plan.popular
                        ? "border-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-white scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
                        <div className="px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                          Gói phổ biến
                        </div>
                      </div>
                    )}

                    <div className="mb-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br from-${plan.color}-100 to-${plan.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <svg
                          className={`w-8 h-8 text-${plan.color}-600`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        {plan.range}
                      </h3>
                      <p className="mb-4 text-sm text-gray-600">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6 text-center">
                      <div className="mb-1 text-3xl font-bold text-gray-900">
                        {formatPrice(price)} VNĐ
                      </div>
                      <div className="mb-2 text-sm text-gray-500">
                        /{billingCycle === "monthly" ? "tháng" : "năm"}
                      </div>
                      {billingCycle === "yearly" && (
                        <div className="text-sm text-green-600">
                          Tiết kiệm {formatPrice(savings.savings)} VNĐ ({savings.percentage}%)
                        </div>
                      )}
                    </div>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCheck className="w-4 h-4 mr-2 text-green-500" />
                        Tối đa {plan.maxStudents.toLocaleString()} học sinh
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCheck className="w-4 h-4 mr-2 text-green-500" />
                        Không giới hạn giáo viên
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCheck className="w-4 h-4 mr-2 text-green-500" />
                        Hỗ trợ 24/7
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCheck className="w-4 h-4 mr-2 text-green-500" />
                        Tất cả tính năng cao cấp
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      Chọn gói này
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Features Section */}
            <div className="p-8 mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl md:p-12">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-gray-900">
                  Các tính năng bao gồm
                </h3>
                <p className="text-lg text-gray-600">
                  Tất cả các gói đều bao gồm đầy đủ các tính năng sau
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
                  >
                    <div className="flex-shrink-0 mr-4 text-2xl">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium leading-relaxed text-gray-700">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Cần tư vấn thêm?
              </h3>
              <p className="mb-8 text-gray-600">
                Liên hệ với chúng tôi để được tư vấn gói dịch vụ phù hợp nhất
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center px-6 py-3 font-semibold text-white transition-colors duration-300 bg-blue-600 shadow-lg hover:bg-blue-700 rounded-xl hover:shadow-xl">
                  <FaPhone className="w-5 h-5 mr-2" />
                  Gọi tư vấn
                </button>
                <button className="inline-flex items-center px-6 py-3 font-semibold text-gray-700 transition-colors duration-300 border border-gray-300 rounded-xl hover:bg-gray-50">
                  <FaEnvelope className="w-5 h-5 mr-2" />
                  Gửi email
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default PricingPage;
