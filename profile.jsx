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
    return <div>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Profile</h1>
          <p>Email: {user.email}</p>
          <p>First Name: {user.first_name ? user.first_name : 'N/A'}</p> {/* Default to 'N/A' if no first name */}
          <p>Last Name: {user.last_name ? user.last_name : 'N/A'}</p> {/* Default to 'N/A' if no last name */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;