import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

const TermsAgreement = ({ register, error }) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <input
          {...register("agreeToTerms", {
            required: "Bạn phải đồng ý với điều khoản sử dụng",
          })}
          type="checkbox"
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Tôi đồng ý với{" "}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
              Chính sách bảo mật
            </Link>{" "}
            của EduCore.
          </label>
          {error && (
            <div className="flex items-center mt-2 text-sm text-red-600">
              <FaExclamationCircle className="w-4 h-4 mr-1" />
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;
