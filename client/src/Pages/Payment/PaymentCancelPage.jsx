import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PaymentService from '../../Services/payment.service';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCancel = async () => {
      try {
        const orderId = searchParams.get('orderId');
        
        if (orderId) {
          await PaymentService.handleCancel(orderId);
        }
      } catch (error) {
        console.error('Error handling payment cancellation:', error);
      }
    };

    handleCancel();
  }, [searchParams]);

  const handleRetry = () => {
    navigate('/pricing');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaTimesCircle className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. You can try again anytime or continue exploring our plans.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
