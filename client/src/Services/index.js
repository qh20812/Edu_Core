// Export tất cả services để dễ dàng import
export { apiClient } from './apiClient.service';
export { authService } from './auth.service';
export { userService } from './user.service';
export { classService } from './class.service';
export { assignmentService } from './assignment.service';
export { submissionService } from './submission.service';
export { examService } from './exam.service';
export { questionService } from './question.service';
export { tenantService } from './tenant.service';
export { notificationService } from './notification.service';
export { systemService } from './system.service';

// Import để sử dụng trong object services
import { authService } from './auth.service';
import { userService } from './user.service';
import { classService } from './class.service';
import { assignmentService } from './assignment.service';
import { submissionService } from './submission.service';
import { examService } from './exam.service';
import { questionService } from './question.service';
import { tenantService } from './tenant.service';
import { notificationService } from './notification.service';
import { systemService } from './system.service';

// Cũng có thể tạo một object chứa tất cả services
export const services = {
  auth: authService,
  user: userService,
  class: classService,
  assignment: assignmentService,
  submission: submissionService,
  exam: examService,
  question: questionService,
  tenant: tenantService,
  notification: notificationService,
  system: systemService,
};

// Helper function để handle lỗi chung
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.message.includes('Unauthorized') || error.message.includes('401')) {
    // Redirect to login if unauthorized
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  
  return {
    success: false,
    message: error.message || 'Đã xảy ra lỗi không mong muốn',
  };
};

// Helper function để format query string
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

