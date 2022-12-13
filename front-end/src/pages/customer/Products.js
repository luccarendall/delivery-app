import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import CartContext from '../../context/cartContext';
import requestAPI from '../../utils/RequestAPI';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cart } = useContext(CartContext);
  const history = useHistory();

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  useEffect(() => {
    const getProducts = async () => {
      const goodHTTPResponse = 200;
      const { status, data } = await requestAPI('GET', 'products');
      if (status === goodHTTPResponse) {
        setProducts(data);
      }
    };
    getProducts();
  }, []);

  const totalCart = cart.reduce((acc, item) => (
    item.qty * parseFloat(item.price) + acc
  ), 0);

  return (
    <div>
      <NavBar />
      {
        products && products.map((product) => (
          <ProductCard key={ product.id } product={ product } />
        ))
      }
      <button
        type="button"
        onClick={ () => goTo('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ cart.length === 0 }
      >
        Carrinho:
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalCart.toFixed(2).replace('.', ',') }
        </span>
      </button>
    </div>
  );
}
