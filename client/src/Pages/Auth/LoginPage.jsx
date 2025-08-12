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
} from "react-icons/fa";

const LoginPage = () => {
  // Sử dụng các hook đã tạo
  const { login } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State để quản lý trạng thái loading của form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sử dụng react-hook-form để quản lý form dễ dàng hơn
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hàm xử lý khi submit form
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        showSuccess(t("auth.loginSuccess"));
        navigate("/dashboard"); // Chuyển hướng đến dashboard
      } else {
        showError(result.message || t("auth.invalidCredentials"));
      }
    } catch (error) {
      showError(error.message || t("auth.loginFailed"));
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
            {t("auth.login")}
          </p>
        </div>

        {/* Login Form */}
        <div className="p-10 bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Input */}
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

            {/* Password Input */}
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
                  placeholder="Nhập mật khẩu"
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
                t("auth.login")
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-base text-gray-600 dark:text-gray-400">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                {t("auth.register")}
              </Link>
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Bạn là trường học muốn tham gia?{" "}
              <Link
                to="/tenant-register"
                className="font-medium text-purple-600 transition-colors hover:text-purple-500"
              >
                Đăng ký trường học
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

export default LoginPage;
