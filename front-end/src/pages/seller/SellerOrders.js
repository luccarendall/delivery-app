import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import requestApi from '../../utils/RequestAPI';
import OrderCard from '../../components/OrderCard/OrderCard';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [token] = useLocalStorage('token', '');
  const [user] = useLocalStorage('user', {});

  const history = useHistory();

  useEffect(() => {
    if (user.role !== 'seller') {
      history.goBack();
    }
  }, [history, user.role]);

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
            onClick={ () => goTo(`/seller/orders/${order.id}`) }
          >
            <OrderCard order={ order } />
          </button>
        ))
      }
    </div>
  );
}
