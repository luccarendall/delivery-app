import React, { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useState();

  useEffect(() => {
    const cartStorage = localStorage.getItem('user') || JSON.stringify({});
    setCart(JSON.parse(cartStorage));
  }, []);

  const removeProduct = useCallback((product) => {
    const newCart = cart.filter((item) => item !== product);
    setCart(newCart);
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    removeProduct,
  }), [cart, removeProduct]);

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
