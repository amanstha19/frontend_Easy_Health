import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const OrderSuccessScreen = () => {
  const { orderId } = useParams();  // Get the order ID from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/order/${orderId}/`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        alert('There was an error fetching your order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="order-success-screen">
      {loading ? (
        <div>Loading...</div>
      ) : orderDetails ? (
        <Card>
          <Card.Body>
            <h2>Order Placed Successfully</h2>
            <p>Order ID: {orderDetails.id}</p>
            <p>Delivery Address: {orderDetails.address}</p>
            <p>Total Price: NPR {orderDetails.total_price}</p>

            <h4>Order Items:</h4>
            <ListGroup>
              {orderDetails.items.map((item) => (
                <ListGroup.Item key={item.id}>
                  {item.name} - {item.quantity} x NPR {item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </Card.Body>
        </Card>
      ) : (
        <div>Order details not found.</div>
      )}
    </div>
  );
};

export default OrderSuccessScreen;
