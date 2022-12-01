import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useState();

  useEffect(() => {
    const cartStorage = localStorage.getItem('user') || JSON.stringify({});
    setCart(JSON.parse(cartStorage));
  }, []);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
  }), [cart]);

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
