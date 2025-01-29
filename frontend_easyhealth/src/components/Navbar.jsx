import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';  // Ensure the path is correct

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Logout from context
    navigate('/');  // Redirect to home page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-uppercase text-light" to="/" style={{ letterSpacing: '2px', fontSize: '1.5rem' }}>
          Easy Health
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active ms-3" to="/">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link ms-3" to="/ambulance">Ambulance</Link>
            </li>
          </ul>

          <Link to="/cart" className="btn btn-outline-light ms-2 btn-lg">
            <i className="bi bi-cart"></i> Cart
          </Link>

          {user ? (
            <div className="d-flex ms-3">
              <span className="navbar-text text-light me-2">Hello, {user?.username}</span>
              <Link to="/profile" className="btn btn-outline-light ms-2 btn-sm">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-2">
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex ms-3">
              <Link to="/login" className="btn btn-outline-light ms-2 btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline-light ms-2 btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;