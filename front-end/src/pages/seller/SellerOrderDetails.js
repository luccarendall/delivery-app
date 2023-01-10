import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import ProductsPreview from '../../components/ProductsPreview/ProductsPreview';
import requestApi from '../../utils/RequestAPI';
import useLocalStorage from '../../hooks/useLocalStorage';

function SellerOrderDetails({ match: { params: { id } } }) {
  const [order, setOrder] = useState({});
  const [user] = useLocalStorage('user', '');

  const mainComponent = `flex justify-items-center items-center flex-col
  text-xl border-2 border-solid border-grey-500
  rounded-lg shadow-lg shadow-zinc-400 w-2/3`;
  const greyText = 'text-gray-400 px-4 text-1xl mb-4';
  const infoText = 'mr-2';
  const statusColor = {
    Pendente: 'bg-[#ff4646]',
    Preparando: 'bg-[#d6b333]',
    'Em Trânsito': 'bg-[#4084e9]',
    Entregue: 'bg-[#309c2c]',
  };
  const roundedBackground = 'px-4 py-2 rounded-md';
  const buttons = `font-medium disabled:bg-grey duration-200
  shadow disabled:shadow-grey border-none
  text-white`;

  useEffect(() => {
    const getOrder = async () => {
      const goodHttpResponse = 200;
      const {
        status,
        data,
      } = await requestApi('GET', `sales/${id}`, {}, { authorization: user.token });

      if (status === goodHttpResponse) setOrder(data);
    };
    getOrder();
  }, [id, user.token]);

  const handleButton = async ({ target }) => {
    const { value } = target;
    await requestApi('PATCH', `sales/${id}/?status=${value}`);
    setOrder((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const date = new Date(order.saleDate);

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center flex-col mt-12">
        <p className={ `${greyText} text-2xl font-medium` }>Detalhe do Pedido</p>
        <main className={ mainComponent }>
          <div className="w-full flex justify-around items-center my-2">
            <span
              className={ infoText }
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${order.id}`}
            </span>
            <span
              className={ infoText }
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {
                `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              }
            </span>
            <span
              className={
                `${infoText} ${statusColor[order.status]} ${roundedBackground} text-white`
              }
              data-testid="seller_order_details__element-order-details-label-delivery
            -status"
            >
              {order.status}
            </span>
            <button
              className={
                `${infoText} ${roundedBackground} ${buttons} ${statusColor.Preparando}`
              }
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ handleButton }
              value="Preparando"
              disabled={ order.status !== 'Pendente' }
            >
              Preparar Pedido
            </button>
            <button
              className={
                `${infoText} ${roundedBackground} ${buttons}
                ${statusColor['Em Trânsito']}`
              }
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              onClick={ handleButton }
              value="Em Trânsito"
              disabled={ order.status !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </div>
          <div className="w-11/12 mb-2">
            { order.products && <ProductsPreview
              propsPageName="seller_order_details"
              propsProducts={ order.products }
            />}
          </div>
        </main>
      </div>
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
