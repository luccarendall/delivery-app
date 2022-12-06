import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import NavBar from '../../components/NavBar';
import requestApi from '../../utils/RequestAPI';
import OrderCard from '../../components/OrderCard/OrderCard';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [token] = useLocalStorage('token', '');
  const [user] = useLocalStorage('user', {});
  const history = useHistory();

  useEffect(() => {
    if (user.role !== 'customer') {
      history.goBack();
    }
  });

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await requestApi('GET', 'sales', {}, { authorization: token });
      if (data) setOrders(data);
    };
    getOrders();
  }, [token]);

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
