import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import cartContext from '../../context/cartContext';

function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;
  const [qty, setQty] = useState(0);
  const { cart, removeProduct, addToCart, updateCart } = useContext(cartContext);

  useEffect(() => {
    if (cart) {
      const item = cart.find((cartItem) => cartItem.id === id);
      if (item) setQty(item.qty);
      else setQty(0);
    }
  }, [cart, id]);

  const decrement = () => {
    if (qty === 1) {
      removeProduct(id);
    } else {
      updateCart('decrement', product);
    }
  };

  const increment = () => {
    if (qty === 0) {
      addToCart(product);
    } else {
      updateCart('increment', product);
    }
  };

  const handleQtyChange = ({ target }) => {
    const { value } = target;
    if (parseInt(value, 10) === 0) removeProduct(id);
    else updateCart('manual', product, value);
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
          disabled={ qty === 0 }
          onClick={ decrement }
        >
          -
        </button>
        <input
          type="number"
          className="product-card-qty"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ qty }
          onChange={ handleQtyChange }
        />
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
  product: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    price: propTypes.string,
    urlImage: propTypes.string,
  }).isRequired,
};

export default ProductCard;
