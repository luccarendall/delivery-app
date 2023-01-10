import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import CartContext from '../../context/cartContext';
import requestAPI from '../../utils/RequestAPI';
import cartIcon from '../../images&Info/shopping-cart-solid.svg';
import Footer from '../../components/Footer/Footer';

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
    <div
      className="grid relative"
    >
      <div
        className="sticky top-0 w-full z-50"
      >
        <NavBar />
        <h1
          className="font-bold text-lg mb-6 bg-yellow px-4 py-1.5
          rounded-sm text-center drop-shadow-md"
        >
          Produtos
        </h1>
      </div>
      <div
        className="grid grid-cols-4 place-self-center justify-items-center mb-16 gap-x-16"
      >
        {
          products && products.map((product) => (
            <ProductCard key={ product.id } product={ product } />
          ))
        }
      </div>
      <div className="flex flex-row">
        <button
          type="button"
          onClick={ () => goTo('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ cart.length === 0 }
          className="fixed bottom-14 right-8 h-16
          flex items-center border-none rounded-full bg-yellow
          p-4 shadow-xl hover:bg-h-yellow
          "
        >
          <img
            src={ cartIcon }
            alt="shopping-cart-icon"
            className="w-7 mx-2"
          />
          <span
            data-testid="customer_products__checkout-bottom-value"
            className="mx-2"
          >
            { `R$ ${totalCart.toFixed(2).replace('.', ',')}` }
          </span>
        </button>
      </div>
      <Footer />
    </div>
  );
}
