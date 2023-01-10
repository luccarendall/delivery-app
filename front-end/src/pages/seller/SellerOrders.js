import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import requestApi from '../../utils/RequestAPI';
import OrderCard from '../../components/OrderCard/OrderCard';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user] = useLocalStorage('user', {});

  const history = useHistory();

  useEffect(() => {
    if (user.role !== 'seller') {
      history.goBack();
    }
  }, [history, user.role]);

  useEffect(() => {
    const getOrders = async () => {
      const goodHttpResponse = 200;
      const {
        status, data,
      } = await requestApi('GET', 'sales', {}, { authorization: user.token });
      if (status === goodHttpResponse) setOrders(data);
    };
    getOrders();
  }, [user.token]);

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  return (
    <div className="grid">
      <NavBar />
      <h1
        className="font-bold text-lg mb-6 bg-yellow py-1.5
        text-center drop-shadow-md"
      >
        Meus Pedidos
      </h1>
      <div
        className="grid grid-cols-2 place-self-center justify-items-center
        w-2/4"
      >
        {
          orders && orders.map((order) => (
            <button
              key={ order.id }
              type="button"
              onClick={ () => goTo(`/seller/orders/${order.id}`) }
            >
              <OrderCard
                propsPageName="seller_orders"
                order={ order }
              />
            </button>
          ))
        }
      </div>
    </div>
  );
}
