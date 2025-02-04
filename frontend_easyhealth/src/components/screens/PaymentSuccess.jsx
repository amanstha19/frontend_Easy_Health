import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get the data parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');

        if (!encodedData) {
          throw new Error('No payment data received');
        }

        // Decode the base64 data
        const decodedData = JSON.parse(atob(encodedData));
        
        // Verify payment with backend
        const response = await fetch('/api/verify-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction_code: decodedData.transaction_code,
            status: decodedData.status,
            transaction_uuid: decodedData.transaction_uuid
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        setPaymentDetails(decodedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handleReturn = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {error ? 'Payment Verification Failed' : 'Payment Successful'}
          </h2>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {paymentDetails && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Transaction Code</p>
                    <p className="font-medium">{paymentDetails.transaction_code}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{paymentDetails.status}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-medium">NPR {paymentDetails.total_amount}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleReturn}
                className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Orders
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;