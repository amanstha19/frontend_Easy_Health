import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Navbar() {
  const { user, setUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext if it handles clearing tokens
    setUser(null); // Clear user state
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-uppercase text-light" href="#" style={{ letterSpacing: '2px', fontSize: '1.5rem' }}>
          Easy Health
        </a>
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
              <a className="nav-link active ms-3" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-3" href="#">Lab Test</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link ms-3" to="/ambulance">Ambulance</Link>
            </li>
          </ul>

          <a href="/cart" className="btn btn-outline-light ms-2 btn-lg">
            <i className="bi bi-cart"></i> Cart
          </a>

          {user ? (
            <div className="d-flex ms-3">
              <span className="navbar-text text-light me-2">Hello, {user.username}</span>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
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
