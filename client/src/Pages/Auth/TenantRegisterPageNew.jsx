import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUI } from "../../Hooks/useUI";
import {
  FaSchool,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaDollarSign,
} from "react-icons/fa";
import {
  FormField,
  PasswordField,
  SchoolTypeDropdown,
  FormSection,
  TermsAgreement,
  ProcessInfo,
} from "../../Components/Forms";
import { tenantService } from "../../Services/tenant.service";

const TenantRegisterPage = () => {
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSchoolType, setSelectedSchoolType] = useState("high_school");
  
  // Get plan information from URL params
  const [selectedPlan, setSelectedPlan] = useState({
    plan: searchParams.get('plan') || 'small',
    billing: searchParams.get('billing') || 'monthly',
    price: searchParams.get('price') || '3000000',
    maxStudents: searchParams.get('maxStudents') || '300'
  });

  useEffect(() => {
    // Update plan info if URL params change
    const plan = searchParams.get('plan');
    const billing = searchParams.get('billing');
    const price = searchParams.get('price');
    const maxStudents = searchParams.get('maxStudents');
    
    if (plan || billing || price || maxStudents) {
      setSelectedPlan({
        plan: plan || 'small',
        billing: billing || 'monthly',
        price: price || '3000000',
        maxStudents: maxStudents || '300'
      });
    }
  }, [searchParams]);

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
      
      // Prepare data in the format expected by backend
      const tenantInfo = {
        name: data.schoolName,
        school_code: data.schoolCode || undefined, // Don't send empty string
        school_type: data.schoolType || selectedSchoolType,
        address: data.address,
        city: data.city,
        province: data.province,
        postal_code: data.postalCode || undefined,
        contact_email: data.email,
        contact_phone: data.phone,
        website: data.website || undefined,
        established_year: data.establishedYear ? parseInt(data.establishedYear) : undefined,
        total_students: data.totalStudents ? parseInt(data.totalStudents) : undefined,
        total_teachers: data.totalTeachers ? parseInt(data.totalTeachers) : undefined,
        description: data.description || undefined,
      };

      const adminInfo = {
        email: data.adminEmail,
        password: data.password,
        full_name: data.adminFullName,
        phone: data.adminPhone || undefined,
        position: data.adminPosition,
      };

      const planInfo = {
        plan: selectedPlan.plan,
        billing_cycle: selectedPlan.billing,
      };

      console.log("Sending data to backend:", { tenantInfo, adminInfo, planInfo });

      // Call the actual registration API
      const response = await tenantService.registerTenantWithPlan(
        tenantInfo,
        adminInfo,
        planInfo
      );

      console.log("Registration response:", response);

      if (response.success) {
        showSuccess("Đăng ký thành công! Bạn có thể tiến hành thanh toán để kích hoạt tài khoản.");
        
        // If plan is not trial, redirect to payment
        if (selectedPlan.plan !== 'trial') {
          // Here you could redirect to payment page with tenant ID
          navigate("/tenant-registration-success", { 
            state: { 
              tenantId: response.data?.tenantId,
              planInfo: selectedPlan 
            }
          });
        } else {
          navigate("/tenant-registration-success");
        }
      } else {
        // Handle test server response format
        if (response.errors) {
          const errorMessages = response.errors.map(err => err.msg).join(', ');
          showError("Lỗi validation: " + errorMessages);
        } else {
          showError(response.message || "Đăng ký thất bại");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Log detailed error for debugging
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        showError("Lỗi validation: " + errorMessages);
      } else {
        showError("Đăng ký thất bại: " + (error.response?.data?.message || error.message));
      }
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
          {/* Selected Plan Information */}
          {selectedPlan.plan && (
            <FormSection title="Gói dịch vụ đã chọn" icon={FaDollarSign}>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Gói:</span>
                    <p className="text-lg font-semibold text-blue-600 capitalize">
                      {selectedPlan.plan === 'small' && 'Dưới 300 học sinh'}
                      {selectedPlan.plan === 'medium' && '301-700 học sinh'}
                      {selectedPlan.plan === 'large' && '701-900 học sinh'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Chu kỳ thanh toán:</span>
                    <p className="text-lg font-semibold text-blue-600">
                      {selectedPlan.billing === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Giá:</span>
                    <p className="text-lg font-semibold text-blue-600">
                      {new Intl.NumberFormat('vi-VN').format(selectedPlan.price)} VNĐ
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Bạn sẽ có thể thanh toán sau khi hoàn tất đăng ký trường học.</p>
                </div>
              </div>
            </FormSection>
          )}

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
                label="Mã trường (tùy chọn)"
                icon={FaSchool}
                placeholder="Ví dụ: NH001 (chỉ chữ hoa và số)"
                register={register}
                error={errors.schoolCode}
                validation={{
                  validate: (value) => {
                    if (!value || value === '') return true; // Allow empty
                    if (value.length < 3) return "Mã trường phải có ít nhất 3 ký tự";
                    if (!/^[A-Z0-9]+$/.test(value)) return "Mã trường chỉ được chứa chữ cái viết hoa và số";
                    return true;
                  }
                }}
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
                placeholder="0123 456 789 hoặc +84 123 456 789"
                register={register}
                error={errors.phone}
                validation={{
                  pattern: {
                    value: /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/,
                    message: "Số điện thoại không hợp lệ (định dạng Việt Nam)",
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
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Lưu ý về mật khẩu:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Tối thiểu 8 ký tự</li>
                <li>• Phải có ít nhất 1 chữ thường (a-z)</li>
                <li>• Phải có ít nhất 1 chữ hoa (A-Z)</li>
                <li>• Phải có ít nhất 1 số (0-9)</li>
                <li>• Phải có ít nhất 1 ký tự đặc biệt (@$!%*?&)</li>
              </ul>
            </div>
            
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
                placeholder="0987 654 321 hoặc +84 987 654 321"
                register={register}
                error={errors.adminPhone}
                validation={{
                  pattern: {
                    value: /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/,
                    message: "Số điện thoại không hợp lệ (định dạng Việt Nam)",
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
                placeholder="Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
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
