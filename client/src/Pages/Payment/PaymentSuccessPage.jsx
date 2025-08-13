import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PaymentService from '../../Services/payment.service';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        const orderId = searchParams.get('orderId');
        const payerId = searchParams.get('PayerID');

        if (!orderId || !payerId) {
          setError('Invalid payment parameters');
          setLoading(false);
          return;
        }

        // Process the payment
        const result = await PaymentService.handleSuccess({
          orderId,
          payerId
        });

        if (result.success) {
          setSuccess(true);
          setPaymentDetails(result.data);
        } else {
          setError(result.message || 'Payment processing failed');
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        setError(error.response?.data?.message || 'Payment processing failed');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Processing Payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Error
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <FaCheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your subscription has been activated successfully.
          </p>
          
          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Payment Details:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{paymentDetails.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing:</span>
                  <span className="font-medium">{paymentDetails.billingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Until:</span>
                  <span className="font-medium">
                    {new Date(paymentDetails.subscriptionEndDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccessPage;
