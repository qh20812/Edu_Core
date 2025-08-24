import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Hooks/useAuthQueries";
import { useUI } from "../../Hooks/useUI";
import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { FormField, PasswordField, RoleDropdown } from "../../Components/Forms";

const RegisterPage = () => {
  const { register: authRegister, isLoading } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("student");

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

      await authRegister(userData);
      showSuccess(t("auth.registerSuccess") + ". Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      showError(error.message || t("auth.registerFailed"));
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
            <FormField
              label={t("auth.fullName")}
              name="fullName"
              type="text"
              icon={FaUser}
              register={register}
              validation={{ required: "Họ tên là bắt buộc" }}
              error={errors.fullName}
              placeholder="Nhập họ và tên"
            />

            {/* Email */}
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

            {/* Role Selection */}
            <RoleDropdown
              label={t("auth.role")}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              t={t}
            />

            {/* Password */}
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
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            />

            {/* Confirm Password */}
            <PasswordField
              label={t("auth.confirmPassword")}
              name="confirmPassword"
              register={register}
              validation={{
                validate: (value) =>
                  value === password || t("auth.passwordMismatch"),
              }}
              error={errors.confirmPassword}
              placeholder="Nhập lại mật khẩu"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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

export default RegisterPage;
