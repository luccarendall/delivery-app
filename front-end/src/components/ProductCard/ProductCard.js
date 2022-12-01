import React, { useState } from 'react';
import propTypes from 'prop-types';

function ProductCard({ id, name, price, urlImage }) {
  const [qty, setQty] = useState(0);

  const decrement = () => {
    setQty(qty - 1);
  };

  const increment = () => {
    setQty(qty + 1);
  };

  return (
    <section className="product-card">
      <div className="product-price">
        <p data-testid={ `customer_products__element-card-price-${id}` }>
          { `R$ ${price}` }
        </p>
      </div>
      <div className="product-image-container">
        <img
          className="product-card-img"
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <div className="product-card-qty">
        <p data-testid={ `customer_products__element-card-title-${id}` }>
          { name }
        </p>
        <button
          className="product-card-rm-item"
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ decrement }
        >
          -
        </button>
        <span
          className="product-card-qty"
          data-testid={ `customer_products__input-card-quantity-${id}` }
        >
          { qty }
        </span>
        <button
          className="product-card-add-item"
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ increment }
        >
          +
        </button>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  urlImage: propTypes.string.isRequired,
};

export default ProductCard;
