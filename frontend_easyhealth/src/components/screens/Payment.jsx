import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const navigate = useNavigate();

  const handlePayment = async () => {
    // Simulate payment processing
    await axios.post('/api/orders/place_order/', { /* order data */ });

    navigate('/order-confirmation');
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
}

export default Payment;
