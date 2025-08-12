import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function để merge các className với Tailwind CSS
 * Kết hợp clsx và tailwind-merge để xử lý conflicts của Tailwind classes
 * 
 * @param {...(string | object | array)} inputs - Các className hoặc conditional classes
 * @returns {string} - Merged className string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format số với dấu phẩy phân cách hàng nghìn
 * @param {number} num - Số cần format
 * @returns {string} - Số đã được format
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Format ngày tháng theo định dạng Việt Nam
 * @param {Date|string} date - Ngày cần format
 * @returns {string} - Ngày đã được format
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Format ngày giờ theo định dạng Việt Nam
 * @param {Date|string} date - Ngày giờ cần format
 * @returns {string} - Ngày giờ đã được format
 */
export function formatDateTime(date) {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

/**
 * Tính toán thời gian tương đối (ví dụ: "2 phút trước")
 * @param {Date|string} date - Ngày cần tính
 * @returns {string} - Thời gian tương đối
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  
  return formatDate(date);
}

/**
 * Truncate text với độ dài tối đa
 * @param {string} text - Text cần truncate
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} - Text đã được truncate
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate màu sắc dựa trên string
 * @param {string} str - String để generate màu
 * @returns {string} - Hex color code
 */
export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

/**
 * Validate email format
 * @param {string} email - Email cần validate
 * @returns {boolean} - True nếu email hợp lệ
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate initials từ tên đầy đủ
 * @param {string} fullName - Tên đầy đủ
 * @returns {string} - Initials (ví dụ: "Nguyễn Văn A" -> "NVA")
 */
export function getInitials(fullName) {
  if (!fullName) return '';
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 3);
}

/**
 * Deep clone object
 * @param {*} obj - Object cần clone
 * @returns {*} - Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Debounce function
 * @param {Function} func - Function cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate random ID
 * @param {number} length - Độ dài ID
 * @returns {string} - Random ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
