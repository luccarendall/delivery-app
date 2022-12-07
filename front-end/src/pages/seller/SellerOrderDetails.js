import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import ProductsPreview from '../../components/ProductsPreview/ProductsPreview';
import requestApi from '../../utils/RequestAPI';
import useLocalStorage from '../../hooks/useLocalStorage';

function SellerOrderDetails({ match: { params: { id } } }) {
  const [order, setOrder] = useState({});
  const [token] = useLocalStorage('token', '');

  useEffect(() => {
    const getOrder = async () => {
      const goodHttpResponse = 200;
      const {
        status,
        data,
      } = await requestApi('GET', `sales/${id}`, {}, { authorization: token });

      if (status === goodHttpResponse) setOrder(data);
    };
    getOrder();
  }, [id, token]);

  const handleButton = async ({ target }) => {
    const { value } = target;
    await requestApi('PATCH', `sales/${id}/?status=${value}`);
    setOrder((prev) => ({
      ...prev,
      status: value,
    }));
  };

  console.log(order);

  const date = new Date(order.saleDate);

  return (
    <div>
      <NavBar />
      <p>Detalhe do Pedido</p>
      <div>
        <span data-testid="seller_order_details__element-order-details-label-order-id">
          {`Pedido ${order.id}`}
        </span>
        <span data-testid="seller_order_details__element-order-details-label-order-date">
          {
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          }
        </span>
        <span
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {order.status}
        </span>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          onClick={ handleButton }
          value="Preparando"
          disabled={ order.status !== 'Pendente' }
        >
          Preparar Pedido
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          type="button"
          onClick={ handleButton }
          value="Em Trânsito"
          disabled={ order.status !== 'Preparando' }
        >
          Saiu para entrega
        </button>
      </div>
      { order.products && <ProductsPreview propsProducts={ order.products } />}
    </div>
  );
}

SellerOrderDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default SellerOrderDetails;
