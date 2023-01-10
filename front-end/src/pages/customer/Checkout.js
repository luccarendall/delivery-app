import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ProductsPreview from '../../components/ProductsPreview/ProductsPreview';
import useLocalStorage from '../../hooks/useLocalStorage';
import requestApi from '../../utils/RequestAPI';
import CartContext from '../../context/cartContext';
import Footer from '../../components/Footer/Footer';

export default function Checkout() {
  // const [orders, setOrders] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [user] = useLocalStorage('user', '');
  const history = useHistory();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  // const [cart, setCart] = useState('');
  const [sellers, setSellers] = useState([
    'Augusto Varandas',
    'Cristiane Dutra',
    'Gabriel Rodrigues',
    'Henrique Prim',
    'Lucca Rendall',
    'Luiz Felipe',
  ]);
  const classInput = `appearance-none p-2 border-b rounded 
  border-grey focus:outline-none focus:border-yellow 
  focus:border-b-2 bg-white`;

  const classButton = `px-10 shadow bg-yellow 
  hover:bg-r-yellow focus:shadow-outline focus:outline-none 
  text-gray-800 font-bold p-2 py-4 px-12 rounded
  disabled:bg-grey duration-200`;

  const labelText = `
  mb-2 text-sm font-medium text-gray-900 dark:text-white mr-2
  flex flex-col justify-center items-start ml-2`;

  const centralizarDiv = 'flex justify-center items-center';

  const greyText = `flex justify-center items-center 
  text-gray-400 px-4 text-1xl mt-8 mb-4`;

  // puxar os produtos do carrinho e salvar nessa chave abaixo de forma dinâmica
  const doneOrder = async () => {
    const { data } = await requestApi(
      'POST',
      'sales',
      {
        products: cart.map((item) => ({
          id: item.id,
          quantity: item.qty,
        })),
        totalPrice: cart.reduce((acc, cur) => {
          console.log(cur);
          acc += parseFloat(cur.qty) * parseFloat(cur.price);
          return acc;
        }, 0),
        deliveryAddress,
        deliveryNumber,
      },
      { authorization: user.token },
    );
    setCart([]);
    history.push(`/customer/orders/${data.id}`);
  };

  const handlerAdress = (event) => {
    const { value } = event.target;
    setDeliveryAddress(value);
  };

  const handlerAdressNumber = (event) => {
    const { value } = event.target;
    setDeliveryNumber(value);
  };

  const handlerSellers = (event) => {
    const { value } = event.target;
    setSellers(value);
  };

  const handlerSelect = ({ target }) => {
    console.log(`Pessoa vendedora selecionada é: ${target.value}`);
  };

  return (
    <div>
      <NavBar />
      <main className={ centralizarDiv }>
        <div className="w-5/12">
          <span
            className={ greyText }
          >
            Finalizar Pedido

          </span>
          <ProductsPreview
            propsPageName="customer_checkout"
            propsProducts={ cart.map((product) => ({
              ...product,
              SaleProduct: { quantity: product.qty },
            })) }
          />
        </div>
      </main>

      <br />

      <div className={ centralizarDiv }>
        <span
          className={ greyText }
        >
          Detalhes e endereço de entrega
        </span>
      </div>

      <div className="px-4 py-5">
        <form className={ centralizarDiv }>
          <label
            className={ labelText }
            htmlFor="select"
          >
            Pessoa vendedora:
            <select
              data-testid="customer_checkout__select-seller"
              onChange={ handlerSellers && handlerSelect }
              id="select"
              className={ classInput }
            >
              {sellers.map((name, index) => (
                <option key={ index }>
                  { name }
                </option>
              ))}
            </select>
          </label>

          <label
            htmlFor="input-adress"
            className={ labelText }
          >
            Endereço:
            <input
              type="text"
              id="input-adress"
              placeholder="Travessa Terceira da Castellana"
              data-testid="customer_checkout__input-address"
              onChange={ handlerAdress }
              className={ classInput }
            />
          </label>

          <label
            htmlFor="input-adress-number"
            className={ labelText }
          >
            Número:
            <input
              type="number"
              id="input-adress-number"
              placeholder="198"
              data-testid="customer_checkout__input-address-number"
              onChange={ handlerAdressNumber }
              className={ classInput }
            />
          </label>
        </form>
      </div>

      <div
        className={ centralizarDiv }
      >
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => doneOrder() }
          disabled={ deliveryAddress.length === 0 || deliveryNumber.length === 0 }
          className={ classButton }
        >
          Finalizar pedido
        </button>
      </div>
      <Footer />
    </div>
  );
}
