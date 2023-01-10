import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import NavBar from '../../components/NavBar/NavBar';
import requestApi from '../../utils/RequestAPI';
import OrderCard from '../../components/OrderCard/OrderCard';
import Footer from '../../components/Footer/Footer';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [user] = useLocalStorage('user', {});
  const history = useHistory();

  useEffect(() => {
    if (user.role !== 'customer') {
      history.goBack();
    }
  });

  useEffect(() => {
    const getOrders = async () => {
      const goodHTTPResponse = 200;
      const {
        status, data,
      } = await requestApi('GET', 'sales', {}, { authorization: user.token });
      if (status === goodHTTPResponse) setOrders(data);
    };
    getOrders();
  }, [user.token]);

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  return (
    <div
      className="grid relative"
    >
      <div
        className="sticky top-0 w-full z-50"
      >
        <NavBar />
        <h1
          className="font-bold text-lg mb-6 bg-yellow py-1.5
          text-center drop-shadow-md"
        >
          Meus Pedidos
        </h1>
      </div>
      <div
        className="grid grid-cols-2 place-self-center justify-items-center
        w-2/4"
      >
        {
          orders.map((order) => (
            <button
              key={ order.id }
              type="button"
              onClick={ () => goTo(`/customer/orders/${order.id}`) }
            >
              <OrderCard
                propsPageName="customer_orders"
                order={ order }
              />
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
