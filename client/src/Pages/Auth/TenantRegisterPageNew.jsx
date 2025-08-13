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
} from "react-icons/fa";
import {
  FormField,
  PasswordField,
  SchoolTypeDropdown,
  FormSection,
  TermsAgreement,
  ProcessInfo,
} from "../../Components/Forms";

const TenantRegisterPage = () => {
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSchoolType, setSelectedSchoolType] = useState("high_school");

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
          <FormSection title="Thông tin trường học" icon={FaSchool}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* School Name */}
              <FormField
                name="schoolName"
                label="Tên trường học"
                required
                icon={FaSchool}
                placeholder="Ví dụ: Trường THPT Nguyễn Huệ"
                register={register}
                error={errors.schoolName}
                validation={{
                  minLength: {
                    value: 3,
                    message: "Tên trường học phải có ít nhất 3 ký tự",
                  },
                }}
                className="md:col-span-2"
              />

              {/* School Type */}
              <SchoolTypeDropdown
                selectedType={selectedSchoolType}
                onTypeChange={setSelectedSchoolType}
                register={register}
              />

              {/* School Code */}
              <FormField
                name="schoolCode"
                label="Mã trường"
                icon={FaSchool}
                placeholder="Ví dụ: NH001"
                register={register}
                error={errors.schoolCode}
              />

              {/* Address */}
              <FormField
                name="address"
                label="Địa chỉ"
                required
                icon={FaMapMarkerAlt}
                placeholder="Số nhà, tên đường, phường/xã"
                register={register}
                error={errors.address}
                className="md:col-span-2"
              />

              {/* City */}
              <FormField
                name="city"
                label="Thành phố"
                required
                icon={FaMapMarkerAlt}
                placeholder="Ví dụ: Hồ Chí Minh"
                register={register}
                error={errors.city}
              />

              {/* Province */}
              <FormField
                name="province"
                label="Tỉnh/Thành phố"
                required
                icon={FaMapMarkerAlt}
                placeholder="Ví dụ: TP. Hồ Chí Minh"
                register={register}
                error={errors.province}
              />

              {/* Phone */}
              <FormField
                name="phone"
                label="Số điện thoại"
                type="tel"
                required
                icon={FaPhone}
                placeholder="0123 456 789"
                register={register}
                error={errors.phone}
                validation={{
                  pattern: {
                    value: /^[0-9\s\-+()]+$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                }}
              />

              {/* Email */}
              <FormField
                name="email"
                label="Email trường"
                type="email"
                required
                icon={FaEnvelope}
                placeholder="contact@school.edu.vn"
                register={register}
                error={errors.email}
                validation={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                }}
              />
            </div>
          </FormSection>

          {/* Administrator Information */}
          <FormSection title="Thông tin người quản trị" icon={FaUser}>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Admin Full Name */}
              <FormField
                name="adminFullName"
                label="Họ và tên"
                required
                icon={FaUser}
                placeholder="Nguyễn Văn A"
                register={register}
                error={errors.adminFullName}
                validation={{
                  minLength: {
                    value: 2,
                    message: "Họ và tên phải có ít nhất 2 ký tự",
                  },
                }}
              />

              {/* Admin Email */}
              <FormField
                name="adminEmail"
                label="Email cá nhân"
                type="email"
                required
                icon={FaEnvelope}
                placeholder="admin@example.com"
                register={register}
                error={errors.adminEmail}
                validation={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                }}
              />

              {/* Admin Phone */}
              <FormField
                name="adminPhone"
                label="Số điện thoại"
                type="tel"
                required
                icon={FaPhone}
                placeholder="0987 654 321"
                register={register}
                error={errors.adminPhone}
                validation={{
                  pattern: {
                    value: /^[0-9\s\-+()]+$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                }}
              />

              {/* Admin Position */}
              <FormField
                name="adminPosition"
                label="Chức vụ"
                required
                icon={FaUser}
                placeholder="Hiệu trưởng"
                register={register}
                error={errors.adminPosition}
              />

              {/* Password */}
              <PasswordField
                name="password"
                label="Mật khẩu"
                placeholder="Tối thiểu 6 ký tự"
                register={register}
                error={errors.password}
              />

              {/* Confirm Password */}
              <PasswordField
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                register={register}
                error={errors.confirmPassword}
                watchPassword={password}
              />
            </div>
          </FormSection>

          {/* Terms Agreement */}
          <TermsAgreement register={register} error={errors.agreeToTerms} />

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
          <ProcessInfo />

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
