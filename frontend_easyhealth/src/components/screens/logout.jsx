\import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';  // For React Router v5
import { AuthContext } from './context/AuthProvider';  // Adjust path if necessary

const LogoutButton = () => {
  const { setUser } = useContext(AuthContext);  // Access the context to reset user state
  const history = useHistory();  // React Router v5 for navigation

  const handleLogout = () => {
    // Clear the session storage (or localStorage) where tokens are stored
    sessionStorage.removeItem('authTokens');  // Or localStorage.removeItem('authTokens')

    // Reset user context (if using Context for user state management)
    setUser(null);

    // Redirect to the home page
    history.push('/');  // Navigate to home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;