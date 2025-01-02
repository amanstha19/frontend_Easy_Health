// src/components/ui/button.jsx

import React from 'react';
import PropTypes from 'prop-types';  // Optional for prop validation

const Button = ({ children, onClick, className, size }) => {
  return (
    <button
      className={`btn ${className} ${size === 'lg' ? 'btn-large' : 'btn-medium'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Optional: Add propTypes if needed for validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md']),
};

export default Button; // Make sure it's the default export
