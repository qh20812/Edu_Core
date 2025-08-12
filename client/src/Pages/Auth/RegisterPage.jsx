import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Hooks/useAuth";
import { useUI } from "../../Hooks/useUI";
import {
  FaGraduationCap,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const roleLabels = {
  student: "Học sinh",
  teacher: "Giáo viên",
  parent: "Phụ huynh",
};

const roleColors = {
  teacher:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
  student:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
  parent:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
};

const RegisterPage = () => {
  const { register: authRegister } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: selectedRole,
    },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // NOTE: Trong ứng dụng thực tế, tenant_id thường được xác định theo tên miền
      // hoặc một quy trình nghiệp vụ khác. Ở đây ta tạm gán cứng một giá trị.
      const userData = {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        tenant_id: "66b1129622d05775f5a81812", // THAY THẾ BẰNG TENANT_ID HỢP LỆ CỦA BẠN
      };

      const result = await authRegister(userData);

      if (result.success) {
        showSuccess(t("auth.registerSuccess") + ". Vui lòng đăng nhập.");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        showError(result.message || t("auth.registerFailed"));
      }
    } catch (error) {
      showError(error.message || t("auth.registerFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center mb-3 text-3xl font-bold text-gray-900 transition-colors dark:text-gray-100 group hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaGraduationCap className="w-10 h-10 mr-3 text-blue-600 transition-transform group-hover:scale-110" />
            EduCore
          </Link>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("auth.register")}
          </p>
        </div>

        {/* Register Form */}
        <div className="p-10 bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                {t("auth.fullName")}
              </label>
              <div className="relative">
                <FaUser className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", { required: "Họ tên là bắt buộc" })}
                  className="w-full py-4 pl-12 pr-4 text-lg text-gray-900 transition-all duration-200 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>
              {errors.fullName && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <FaExclamationCircle className="w-4 h-4 mr-1" />
                  {errors.fullName.message}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                {t("auth.email")}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: t("auth.emailRequired") })}
                  className="w-full py-4 pl-12 pr-4 text-lg text-gray-900 transition-all duration-200 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập email của bạn"
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <FaExclamationCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300">
                {t("auth.role")}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-4 text-lg transition-all duration-200 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <div className="flex items-center">
                    <FaUser className="w-6 h-6 mr-3 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">
                      {roleLabels[selectedRole]}
                    </span>
                    <span
                      className={`ml-3 px-3 py-1 text-sm rounded-full border ${roleColors[selectedRole]}`}
                    >
                      {t(`roles.${selectedRole}`)}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 overflow-hidden bg-white border border-gray-300 shadow-lg dark:bg-gray-700 dark:border-gray-600 rounded-xl">
                    {Object.entries(roleLabels).map(([role, label]) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-between ${
                          selectedRole === role
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <span className="text-lg">{label}</span>
                        <span
                          className={`px-3 py-1 text-sm rounded-full border ${roleColors[role]}`}
                        >
                          {t(`roles.${role}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                {t("auth.password")}
              </label>
              <div className="relative">
                <FaLock className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: t("auth.passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("auth.passwordMinLength"),
                    },
                  })}
                  className="w-full py-4 pl-12 text-lg text-gray-900 transition-all duration-200 bg-white border border-gray-300 pr-14 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-6 h-6" />
                  ) : (
                    <FaEye className="w-6 h-6" />
                  )}
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
              <label
                htmlFor="confirmPassword"
                className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                {t("auth.confirmPassword")}
              </label>
              <div className="relative">
                <FaLock className="absolute w-6 h-6 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || t("auth.passwordMismatch"),
                  })}
                  className="w-full py-4 pl-12 text-lg text-gray-900 transition-all duration-200 bg-white border border-gray-300 pr-14 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-6 h-6" />
                  ) : (
                    <FaEye className="w-6 h-6" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <FaExclamationCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 mr-3 border-b-2 border-white rounded-full animate-spin"></div>
                  {t("common.loading")}...
                </>
              ) : (
                t("auth.register")
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-base text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                {t("auth.login")}
              </Link>
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-base text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
