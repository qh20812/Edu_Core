import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      content: "support@educore.vn",
      description: "Gửi email cho chúng tôi bất cứ lúc nào",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: FaPhone,
      title: "Hotline",
      content: "1900 1234",
      description: "Hỗ trợ 24/7 tất cả các ngày trong tuần",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận 1, TP.HCM",
      description: "Văn phòng chính tại thành phố Hồ Chí Minh",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: FaClock,
      title: "Giờ làm việc",
      content: "8:00 - 18:00",
      description: "Thứ 2 - Thứ 6 (trừ ngày lễ)",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {contactInfo.map((info, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
        >
          <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <info.icon className={`w-8 h-8 ${info.iconColor}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {info.title}
          </h3>
          <p className="text-blue-600 font-medium mb-2 text-lg">
            {info.content}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {info.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
