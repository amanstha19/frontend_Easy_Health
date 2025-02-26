import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';

const OrderSuccessScreen = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Retrieve auth token from sessionStorage
      const authTokens = sessionStorage.getItem('authTokens');
      if (!authTokens) {
        setError('No token found, please log in.');
        setLoading(false);
        return;
      }

      const parsedToken = JSON.parse(authTokens);  // Parsing the token to get the access key
      const token = parsedToken?.access;

      if (!token) {
        setError('Invalid token, please log in again.');
        setLoading(false);
        return;
      }

      try {
        // Make API request to fetch order details
        const response = await axios.get(`http://localhost:8000/api/order/${orderId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Passing the token in headers
          },
        });
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
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order Success</h1>
      {orderDetails ? (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Order ID: {orderDetails.id}</Card.Title>
            <Card.Text>
              <strong>Order Total: </strong>NPR {orderDetails.total_price}
            </Card.Text>
            <Card.Text>
              <strong>Status: </strong>{orderDetails.status}
            </Card.Text>
            {/* Add more details as needed */}
            <Button variant="primary" href="/orders" className="mt-3">
              Back to Orders
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning" className="mt-4">
          No order details found.
        </Alert>
      )}
    </div>
  );
};

export default OrderSuccessScreen;
