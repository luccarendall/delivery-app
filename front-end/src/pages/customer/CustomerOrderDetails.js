import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import ProductsPreview from '../../components/ProductsPreview/ProductsPreview';
import requestApi from '../../utils/RequestAPI';
import useLocalStorage from '../../hooks/useLocalStorage';

function OrderDetails({ match: { params: { id } } }) {
  const [order, setOrder] = useState({});
  const [user] = useLocalStorage('user', '');

  useEffect(() => {
    const getOrder = async () => {
      await requestApi('GET', `sales/${id}`, {}, { authorization: user.token })
        .then((resp) => setOrder(resp.data))
        .catch((err) => console.log(err));
    };
    getOrder();
  }, [id, user]);

  const handleButton = async ({ target }) => {
    const { value } = target;
    await requestApi('PATCH', `sales/${id}/?status=${value}`);
    setOrder((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const date = new Date();
  const statusId = 'customer_order_details__element-order-details-label-delivery-status';

  const NUM_MAX_DATE = 9;
  const addZeroDate = (num) => {
    if (num <= NUM_MAX_DATE) {
      return `0${num}`;
    }
    return num;
  };

  return (
    <div>
      <NavBar />
      <p>Detalhe do Pedido</p>
      <div>
        <span data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido ${order.id}`}
          ;
        </span>
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {` P. Vend:  ${order.seller ? order.seller.name : ''}`}
          ;
        </span>
        <span
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {
            `${date.getDate()}/${addZeroDate(date.getMonth() + 1)}/${date.getFullYear()}`
          }
        </span>
        <span
          data-testid={ statusId }
        >
          {order.status}
        </span>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          onClick={ handleButton }
          value="Entregue"
          disabled={ order.status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      </div>
      { order.products && <ProductsPreview
        propsPageName="customer_order_details"
        propsProducts={ order.products }
      />}
    </div>
  );
}

OrderDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default OrderDetails;
