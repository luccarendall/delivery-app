import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ProductsPreview from '../../components/ProductsPreview/ProductsPreview';
import useLocalStorage from '../../hooks/useLocalStorage';
import requestApi from '../../utils/RequestAPI';

export default function Checkout() {
  // const [orders, setOrders] = useState([]);
  const [token] = useLocalStorage('token', '');
  const history = useHistory();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([
    'Fulana Pereira',
    'Fulano Pereira',
    'Fulana Siqueira',
  ]);

  useEffect(() => {
    // buscar produtos do carrinho e usar essa informação na doneOrder
    console.log('xablau');
  });

  // puxar os produtos do carrinho e salvar nessa chave abaixo de forma dinâmica

  const doneOrder = async () => {
    const { data } = await requestApi(
      'POST',
      'sales',
      {
        products: [{
          id: 1,
          quantity: 2,
        }],
        totalPrice: 100,
        deliveryAddress: 'Acre',
        deliveryNumber: '11',
      },
      { authorization: token },
    );
    console.log(data);
    history.push(`/customer/orders/${data.id}`);
  };

  // Checkout page // Checkout page // Checkout page // Checkout page // Checkout page /\ /\ /\
  // deliveryDetails // deliveryDetails // deliveryDetails // deliveryDetails // deliveryDetails \/ \/ \/

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

  // enviar esse data para o BD usando o metodo POST
  // metodo requer: products, totalPrice, deliveryAddress, deliveryNumber,
  const data = [deliveryAddress, deliveryNumber]; // products e totalPrice vem do ProductsPreview que não tô conseguindo acessar
  console.log(data);

  // const checkoutNewOrder = async () => {
  //   const { deliveryData } = await requestApi('POST', 'checkout', {
  //     products,
  //     totalPrice,
  //     deliveryAddress,
  //     deliveryNumber,
  //   });
  // };

  // deliveryDetails // deliveryDetails // deliveryDetails // deliveryDetails// deliveryDetails /\ /\ /\

  return (
    <>
      <NavBar />
      <main>
        <div>
          <span>Finalizar Pedido</span>
          <ProductsPreview
            propsProducts={ [{
              id: 0,
              name: 'teste',
              SaleProduct: { quantity: 5 },
              qty: 3,
              price: 10,
            }] }
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
              // value={ deliveryAddress }
              onChange={ handlerAdress }
            />
          </label>

          <label htmlFor="input-adress-number">
            Número
            <input
              type="text"
              id="input-adress-number"
              placeholder="198"
              data-testid="customer_checkout__input-address-number"
              // value={ deliveryNumber }
              onChange={ handlerAdressNumber }
            />
          </label>
        </form>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => doneOrder() }
        >
          Finalizar pedido
        </button>
      </footer>

    </>
  );
}
