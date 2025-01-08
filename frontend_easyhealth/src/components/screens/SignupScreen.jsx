import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../src/context/AuthProvider';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for navigation in react-router-dom v6

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signup, error } = useContext(AuthContext);
  const navigate = useNavigate();  // Declare useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation: at least 8 characters and 1 special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password should be at least 8 characters long and contain at least 1 special character.');
      return;
    }

    // Call signup function from context
    signup({ email, password, username })
      .then(() => {
        // Redirect to Sign In page after successful signup
        navigate('/signin');
      })
      .catch((err) => {
        console.error('Signup error:', err);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default Signup;
