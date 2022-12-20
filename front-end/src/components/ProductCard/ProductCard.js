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
      addToCart(product, 1);
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
    <section
      className="flex flex-col w-60 h-96 items-center rounded-lg m-8
      justify-between"
    >
      <div
        className="flex flex-col items-center rounded-t-lg w-full h-full
        border-white border-x-2 border-t-2"
      >
        <div className="w-full mt-3 z-10">
          <div
            className="text-white bg-black w-max p-1 px-4 font-bold rounded-r
            drop-shadow-xl"
          >
            <span>R$ </span>
            <span data-testid={ `customer_products__element-card-price-${id}` }>
              { price.toString().replace('.', ',') }
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <img
            className="w-28 hover:scale-150 duration-150 hover:rotate-12"
            src={ urlImage }
            alt={ name }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
          />
        </div>
      </div>
      <div
        className="text-center bg-yellow p-4 rounded-b-lg w-full border-black
        drop-shadow-xl"
      >
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
          className=" text-xl"
        >
          { name }
        </p>
        <button
          className="text-white bg-black w-6 font-bold rounded-l hover:bg-grey"
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          disabled={ qty === 0 }
          onClick={ decrement }
        >
          -
        </button>
        <input
          type="text"
          inputMode="numeric"
          className="w-10 mt-2 text-center border-0 focus:outline-none bg-white"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ qty }
          onChange={ handleQtyChange }
        />
        <button
          className="text-white bg-black w-6 font-bold rounded-r hover:bg-grey"
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
