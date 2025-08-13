import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Hooks/useAuth";
import { useUI } from "../../Hooks/useUI";
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { FormField, PasswordField } from "../../Components/Forms";

const LoginPage = () => {
  // Sử dụng các hook đã tạo
  const { login } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State để quản lý trạng thái loading của form
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        navigate("/dashboard/"); // Chuyển hướng đến dashboard
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
            <FormField
              label={t("auth.email")}
              name="email"
              type="email"
              icon={FaEnvelope}
              register={register}
              validation={{ required: t("auth.emailRequired") }}
              error={errors.email}
              placeholder="Nhập email của bạn"
            />

            {/* Password Input */}
            <PasswordField
              label={t("auth.password")}
              name="password"
              register={register}
              validation={{
                required: t("auth.passwordRequired"),
                minLength: {
                  value: 6,
                  message: t("auth.passwordMinLength"),
                },
              }}
              error={errors.password}
              placeholder="Nhập mật khẩu"
            />

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
            <button
              type="button"
              onClick={() => {
                navigate("/", { replace: true });
              }}
              className="inline-flex items-center text-base text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-transparent border-none cursor-pointer p-0"
            >
              ← Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
