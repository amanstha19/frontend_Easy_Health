// src/components/screens/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);  // Get user from AuthContext

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
