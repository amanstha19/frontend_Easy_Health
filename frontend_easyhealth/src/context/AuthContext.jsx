import React, { useContext } from 'react';
import { AuthContext } from './context/AuthProvider'; // Adjust path as needed

const Profile = () => {
  const { user, error } = useContext(AuthContext);  // Access user and error from context

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      {/* Display first and last name if available */}
      {user.first_name && <p>First Name: {user.first_name}</p>}
      {user.last_name && <p>Last Name: {user.last_name}</p>}
      {/* Add more user info here */}
    </div>
  );
};

export default Profile;
