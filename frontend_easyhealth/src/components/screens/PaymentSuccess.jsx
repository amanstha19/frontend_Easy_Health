import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [status, setStatus] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('status');
    const transactionUuid = queryParams.get('transaction_uuid');
    
    if (paymentStatus && transactionUuid) {
      setStatus(paymentStatus);
      // Handle the payment success/failure logic based on `status`
    }
  }, [location]);

  return (
    <div>
      {status === 'COMPLETE' ? (
        <h1>Payment Successful!</h1>
      ) : (
        <h1>Payment Failed</h1>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
