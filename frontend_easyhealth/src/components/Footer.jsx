import React from 'react';

function Footer() {
  return (
    <div className="container-fluid px-0">
      <footer className="bg-dark text-white">
        {/* Grid container */}
        <div className="container p-4">
          {/* Section: Social media */}
          <section className="mb-4 text-center">
            {/* Facebook */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>

            {/* Twitter */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>

            {/* Google */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="Google">
              <i className="fab fa-google"></i>
            </a>

            {/* Instagram */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>

            {/* Linkedin */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>

            {/* Github */}
            <a className="btn btn-outline-light btn-floating m-2" href="#!" role="button" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* Section: Social media */}

          {/* Section: Quick Links */}
          <section className="mb-4 text-center">
            <a href="#!" className="text-white me-4 text-decoration-none" style={{ fontSize: '1.1rem' }}>About Us</a>
            <a href="#!" className="text-white me-4 text-decoration-none" style={{ fontSize: '1.1rem' }}>Privacy Policy</a>
            <a href="#!" className="text-white me-4 text-decoration-none" style={{ fontSize: '1.1rem' }}>Contact</a>
            <a href="#!" className="text-white me-4 text-decoration-none" style={{ fontSize: '1.1rem' }}>FAQ</a>
          </section>
          {/* Section: Quick Links */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <p className="mb-0" style={{ fontSize: '1rem' }}>
            © {new Date().getFullYear()} | All rights reserved | Designed by{' '}
            <a className="text-white text-decoration-none" href="https://yourwebsite.com">
              EasyHealth
            </a>
          </p>
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
}

export default Footer;