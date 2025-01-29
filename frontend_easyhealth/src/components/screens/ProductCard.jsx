import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '250px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f8f8f8',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid #e4f7e4',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4f7e4',
          }}
        >
          {product.image ? (
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.generic_name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <h3 style={{ fontSize: '1.1rem', margin: '10px 0', color: '#333' }}>{product.generic_name}</h3>
      </Link>
      <p style={{ margin: '5px 0', color: '#555' }}>Category: {product.category}</p>
      <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#2d2d2d' }}>Price: NPR {product.price || 'N/A'}</p>
    </div>
  );
};

// Add PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    generic_name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
