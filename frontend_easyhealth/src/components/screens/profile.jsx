// src/components/Profile.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Display other user info if available */}
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
