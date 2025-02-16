import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const authTokens = sessionStorage.getItem('authTokens'); // Retrieve token from sessionStorage
      if (!authTokens) {
        setError('No token available. Please log in.');
        return;
      }

      try {
        const parsedTokens = JSON.parse(authTokens); // Parse the stored tokens
        console.log('Auth Tokens:', parsedTokens); // Debugging

        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            'Authorization': `Bearer ${parsedTokens.access}`, // Use the access token
          },
        });

        console.log('User Profile:', response.data); // Check the response data
        setUser(response.data); // Save user data to state
      } catch (err) {
        setError('Error fetching profile: ' + err.response?.data?.detail || err.message);
      }
    };

    fetchProfile();
  }, []); // Empty array means this effect runs once when the component mounts

  if (error) {
    return <div style={{ color: 'red', fontSize: '16px' }}>{error}</div>;
  }

  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {user ? (
        <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>{user.username}'s Profile</h1>
            <p style={{ fontSize: '16px', margin: '10px 0' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ fontSize: '16px', margin: '10px 0' }}><strong>First Name:</strong> {user.first_name || 'N/A'}</p>
            <p style={{ fontSize: '16px', margin: '10px 0' }}><strong>Last Name:</strong> {user.last_name || 'N/A'}</p>
          </div>

          <div>
            <h2 style={{ color: '#4CAF50', marginTop: '20px' }}>Orders:</h2>
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <div key={order.order_id} style={{ backgroundColor: '#fff', marginTop: '20px', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <h3 style={{ color: '#333' }}>Order #{order.order_id}</h3>
                  <p style={{ fontSize: '16px' }}><strong>Status:</strong> {order.status}</p>
                  <p style={{ fontSize: '16px' }}><strong>Total Price:</strong> ₹{order.total_price}</p>
                  <p style={{ fontSize: '16px' }}><strong>Shipping Address:</strong> {order.address}</p>

                  <h4 style={{ color: '#333' }}>Products:</h4>
                  {order.cart_items.map((item) => (
                    <div key={item.product_id} style={{ backgroundColor: '#f9f9f9', padding: '10px', marginTop: '10px', borderRadius: '6px' }}>
                      <p style={{ fontSize: '16px' }}><strong>{item.product_name}</strong></p>
                      <p style={{ fontSize: '16px' }}>Quantity: {item.quantity}</p>
                      <p style={{ fontSize: '16px' }}>Price: ₹{item.price}</p>
                      <p style={{ fontSize: '16px' }}>Total Price: ₹{item.total_price}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p style={{ fontSize: '16px' }}>No orders found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
