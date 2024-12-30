import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Easy Health</a>
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
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Lab Test</a>
            </li>
          </ul>

    

          {/* Cart Icon */}
          <a href="/cart" className="btn btn-outline-light ms-2 btn-lg">
            <i className="bi bi-cart"></i> Cart
          </a>

          {/* Login and Sign Up Links - Make buttons smaller */}
          <Link to="/login" className="btn btn-outline-light ms-2 btn-sm">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-light ms-2 btn-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
