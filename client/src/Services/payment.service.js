import { apiClient } from './apiClient.service';

class PaymentService {
  // Create PayPal payment order
  async createOrder(paymentData) {
    try {
      const response = await apiClient.post('/payments/create-order', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  }

  // Handle successful payment
  async handleSuccess(orderData) {
    try {
      const response = await apiClient.post('/payments/success', orderData);
      return response.data;
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw error;
    }
  }

  // Handle cancelled payment
  async handleCancel(orderId) {
    try {
      const response = await apiClient.post('/payments/cancel', { orderId });
      return response.data;
    } catch (error) {
      console.error('Error handling payment cancel:', error);
      throw error;
    }
  }

  // Get payment history
  async getPaymentHistory(tenantId) {
    try {
      const response = await apiClient.get(`/payments/history/${tenantId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  }

  // Check student limit
  async checkStudentLimit(tenantId, additionalStudents = 1) {
    try {
      const response = await apiClient.get(
        `/payments/check-limit/${tenantId}?additionalStudents=${additionalStudents}`
      );
      return response.data;
    } catch (error) {
      console.error('Error checking student limit:', error);
      throw error;
    }
  }

  // Get subscription status
  async getSubscriptionStatus(tenantId) {
    try {
      const response = await apiClient.get(`/payments/subscription/${tenantId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }
}

export default new PaymentService();
