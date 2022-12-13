import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import NavBar from '../../components/NavBar/NavBar';
import requestApi from '../../utils/RequestAPI';
import OrderCard from '../../components/OrderCard/OrderCard';

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
    <div>
      <NavBar />
      {
        orders.map((order) => (
          <button
            key={ order.id }
            type="button"
            onClick={ () => goTo(`/customer/orders/${order.id}`) }
          >
            <OrderCard order={ order } />
          </button>
        ))
      }
    </div>
  );
}
