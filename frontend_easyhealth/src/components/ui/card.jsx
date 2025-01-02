import React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

export const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,  // Validate children prop
  className: PropTypes.string,
};

export const CardContent = ({ children, className }) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,  // Validate children prop
  className: PropTypes.string,
};
