import React, { createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  const removeProduct = useCallback((id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  }, [cart, setCart]);

  const addToCart = useCallback(({ id, name, price, urlImage }) => {
    setCart((oldCart) => [...oldCart, {
      id,
      name,
      price,
      urlImage,
      qty: 1,
    }]);
  }, [setCart]);

  const updateCart = useCallback((type, product, value) => {
    const itemExist = cart.find((item) => item.id === product.id);
    if (!itemExist) addToCart(product);
    else {
      setCart((oldCart) => oldCart.map((item) => {
        if (item.id === product.id) {
          const newQty = {
            manual: parseInt(value, 10),
            increment: item.qty + 1,
            decrement: item.qty - 1,
          };
          return {
            ...item,
            qty: newQty[type],
          };
        } return item;
      }));
    }
  }, [cart, setCart, addToCart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    removeProduct,
    addToCart,
    updateCart,
  }), [cart, setCart, removeProduct, addToCart, updateCart]);

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
