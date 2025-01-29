import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderSuccessScreen = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const authTokens = sessionStorage.getItem('authTokens');
      if (!authTokens) {
        setError('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/order/${orderId}/`);
        setOrderDetails(response.data);
      } catch (error) {
        setError('There was an error fetching your order details.');
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Order Success</h1>
      {orderDetails ? (
        <div>
          <p>Order ID: {orderDetails.id}</p>
          <p>Order Total: NPr{orderDetails.total_price}</p>
          <p>Order Status: {orderDetails.status}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderSuccessScreen;