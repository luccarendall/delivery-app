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
    'Fulana Pereira',
    'Fulano Pereira',
    'Fulana Siqueira',
  ]);

  // useEffect(() => {
  //   if (cart.length === 0) {
  //     history.push('/customer/products');
  //   }
  // });

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
    <>
      <NavBar />
      <main>
        <div>
          <span>Finalizar Pedido</span>
          <ProductsPreview
            propsPageName="customer_checkout"
            propsProducts={ cart.map((product) => ({
              ...product,
              SaleProduct: { quantity: product.qty },
            })) }
          />
        </div>
      </main>

      <footer>
        <span>Detalhes e endereço de entrega</span>
        <form>
          <label htmlFor="select">
            P. vendedora responsável
            <select
              id="select"
              data-testid="customer_checkout__select-seller"
              onChange={ handlerSellers && handlerSelect }
              // value={ sellers }
              // defaultValue={ sellers[0] }

            >

              {sellers.map((name, index) => (
                <option key={ index }>
                  { name }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="input-adress">
            Endereço
            <input
              type="text"
              id="input-adress"
              placeholder="Travessa Terceira da Castellana, Bairro Muruci"
              data-testid="customer_checkout__input-address"
              onChange={ handlerAdress }
            />
          </label>

          <label htmlFor="input-adress-number">
            Número
            <input
              type="number"
              id="input-adress-number"
              placeholder="198"
              data-testid="customer_checkout__input-address-number"
              onChange={ handlerAdressNumber }
            />
          </label>
        </form>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => doneOrder() }
          disabled={ deliveryAddress.length === 0 || deliveryNumber.length === 0 }
        >
          Finalizar pedido
        </button>
      </footer>
      <Footer />
    </>
  );
}
