import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import FormField from './FormField';

const PasswordField = ({
  name,
  label,
  placeholder,
  register,
  error,
  validation = {},
  watchPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = {
    minLength: {
      value: 8,
      message: 'Mật khẩu phải có ít nhất 8 ký tự',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: 'Mật khẩu phải chứa ít nhất: 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt'
    },
    ...validation,
  };

  if (name === 'confirmPassword' && watchPassword) {
    passwordValidation.validate = value =>
      value === watchPassword || 'Mật khẩu không khớp';
  }

  return (
    <FormField
      name={name}
      label={label}
      required
      register={register}
      error={error}
      validation={passwordValidation}
      {...props}
    >
      <input
        {...register(name, passwordValidation)}
        type={showPassword ? 'text' : 'password'}
        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-slate-600'
        }`}
        placeholder={placeholder}
      />
      <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
      <button tabIndex={-1}
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </FormField>
  );
};

export default PasswordField;
