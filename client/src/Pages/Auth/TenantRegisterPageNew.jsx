import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUI } from "../../Hooks/useUI";
import {
  FaSchool,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaUsers,
  FaExclamationCircle,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const schoolTypes = {
  elementary: "Tiểu học",
  secondary: "Trung học cơ sở", 
  high_school: "Trung học phổ thông",
  university: "Đại học",
  vocational: "Dạy nghề",
  kindergarten: "Mẫu giáo",
};

const schoolTypeColors = {
  elementary: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
  secondary: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
  high_school: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700",
  university: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700",
  vocational: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
  kindergarten: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700",
};

const TenantRegisterPage = () => {
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedSchoolType, setSelectedSchoolType] = useState("high_school");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      schoolName: "",
      schoolType: "high_school",
      schoolCode: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      email: "",
      website: "",
      establishedYear: "",
      totalStudents: "",
      totalTeachers: "",
      adminFullName: "",
      adminEmail: "",
      adminPhone: "",
      adminPosition: "Hiệu trưởng",
      password: "",
      confirmPassword: "",
      description: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Tenant registration data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showSuccess("Đăng ký thành công! Yêu cầu của bạn đang chờ được duyệt bởi quản trị viên hệ thống.");
      navigate("/tenant-registration-success");
    } catch (error) {
      showError("Đăng ký thất bại: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full max-w-4xl overflow-hidden bg-white border border-gray-200 shadow-2xl dark:bg-slate-800 rounded-2xl dark:border-slate-700">
        {/* Header */}
        <div className="p-8 text-white bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <FaSchool className="text-3xl" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-center">
            Đăng ký trường học
          </h1>
          <p className="text-center text-blue-100">
            Tham gia hệ thống quản lý giáo dục EduCore
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* School Information */}
          <div>
            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              <FaSchool className="mr-3 text-blue-600" />
              Thông tin trường học
            </h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* School Name */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tên trường học *
                </label>
                <div className="relative">
                  <input
                    {...register("schoolName", {
                      required: "Tên trường học là bắt buộc",
                      minLength: {
                        value: 3,
                        message: "Tên trường học phải có ít nhất 3 ký tự",
                      },
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.schoolName
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Ví dụ: Trường THPT Nguyễn Huệ"
                  />
                  <FaSchool className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.schoolName && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.schoolName.message}
                  </div>
                )}
              </div>

              {/* School Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Loại trường *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full py-3 pl-10 pr-10 text-left text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  >
                    <span className={`px-3 py-1 rounded-full text-sm border ${schoolTypeColors[selectedSchoolType]}`}>
                      {schoolTypes[selectedSchoolType]}
                    </span>
                  </button>
                  <FaBuilding className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-700 dark:border-slate-600">
                      {Object.entries(schoolTypes).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedSchoolType(key);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-600"
                        >
                          <span className={`px-3 py-1 rounded-full text-sm border ${schoolTypeColors[key]}`}>
                            {value}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* School Code */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mã trường
                </label>
                <div className="relative">
                  <input
                    {...register("schoolCode")}
                    type="text"
                    className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-300 rounded-lg dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white dark:placeholder-gray-500"
                    placeholder="Ví dụ: NH001"
                  />
                  <FaBuilding className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Địa chỉ *
                </label>
                <div className="relative">
                  <input
                    {...register("address", {
                      required: "Địa chỉ là bắt buộc",
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.address
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Số nhà, tên đường, phường/xã"
                  />
                  <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.address && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.address.message}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Thành phố *
                </label>
                <div className="relative">
                  <input
                    {...register("city", {
                      required: "Thành phố là bắt buộc",
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.city
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Ví dụ: Hồ Chí Minh"
                  />
                  <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.city && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.city.message}
                  </div>
                )}
              </div>

              {/* Province */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tỉnh/Thành phố *
                </label>
                <div className="relative">
                  <input
                    {...register("province", {
                      required: "Tỉnh/Thành phố là bắt buộc",
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.province
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Ví dụ: TP. Hồ Chí Minh"
                  />
                  <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.province && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.province.message}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <input
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9\s\-+()]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    type="tel"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.phone
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="0123 456 789"
                  />
                  <FaPhone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.phone && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.phone.message}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email trường *
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.email
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="contact@school.edu.vn"
                  />
                  <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Administrator Information */}
          <div>
            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              <FaUser className="mr-3 text-blue-600" />
              Thông tin người quản trị
            </h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Admin Full Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Họ và tên *
                </label>
                <div className="relative">
                  <input
                    {...register("adminFullName", {
                      required: "Họ và tên là bắt buộc",
                      minLength: {
                        value: 2,
                        message: "Họ và tên phải có ít nhất 2 ký tự",
                      },
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.adminFullName
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.adminFullName && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.adminFullName.message}
                  </div>
                )}
              </div>

              {/* Admin Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email cá nhân *
                </label>
                <div className="relative">
                  <input
                    {...register("adminEmail", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.adminEmail
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="admin@example.com"
                  />
                  <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.adminEmail && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.adminEmail.message}
                  </div>
                )}
              </div>

              {/* Admin Phone */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <input
                    {...register("adminPhone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9\s\-+()]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    type="tel"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.adminPhone
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="0987 654 321"
                  />
                  <FaPhone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.adminPhone && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.adminPhone.message}
                  </div>
                )}
              </div>

              {/* Admin Position */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Chức vụ *
                </label>
                <div className="relative">
                  <input
                    {...register("adminPosition", {
                      required: "Chức vụ là bắt buộc",
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.adminPosition
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Hiệu trưởng"
                  />
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
                {errors.adminPosition && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.adminPosition.message}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mật khẩu *
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Mật khẩu là bắt buộc",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.password
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Xác nhận mật khẩu *
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Xác nhận mật khẩu là bắt buộc",
                      validate: value =>
                        value === password || "Mật khẩu không khớp",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.confirmPassword
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    }`}
                    placeholder="Nhập lại mật khẩu"
                  />
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-slate-700">
            <div className="flex items-start space-x-3">
              <input
                {...register("agreeToTerms", {
                  required: "Bạn phải đồng ý với điều khoản sử dụng",
                })}
                type="checkbox"
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Tôi đồng ý với{" "}
                  <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                    Chính sách bảo mật
                  </Link>{" "}
                  của EduCore.
                </label>
                {errors.agreeToTerms && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <FaExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.agreeToTerms.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 font-medium text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <FaSchool />
                  <span>Đăng ký trường học</span>
                </>
              )}
            </button>
            <Link
              to="/login"
              className="flex-1 px-6 py-3 font-medium text-center text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600"
            >
              Quay lại đăng nhập
            </Link>
          </div>

          {/* Information about process */}
          <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <h3 className="mb-3 font-medium text-blue-900 dark:text-blue-100">
              Quy trình đăng ký
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></div>
                <span>Gửi thông tin đăng ký</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></div>
                <span>Thời gian xử lý: 1-3 ngày làm việc</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></div>
                <span>Bạn sẽ nhận được email thông báo kết quả</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></div>
                <span>Sau khi được duyệt, bạn có thể đăng nhập và sử dụng hệ thống</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="pt-6 text-center border-t border-gray-200 dark:border-slate-700">
            <p className="text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantRegisterPage;
