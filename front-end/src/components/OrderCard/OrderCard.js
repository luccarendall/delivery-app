import React from 'react';
import propTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';

function OrderCard({ order, propsPageName }) {
  const [user] = useLocalStorage('user', {});

  const { id,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    deliveryNumber } = order;

  const date = new Date(saleDate);

  const statusColor = {
    Pendente: 'bg-[#ff4646]',
    Preparando: 'bg-[#d6b333]',
    'Em Trânsito': 'bg-[#4084e9]',
    Entregue: 'bg-[#309c2c]',
  };

  const NUM_MAX_DATE = 9;
  const addZeroToDate = (num) => {
    if (num <= NUM_MAX_DATE) {
      return `0${num}`;
    }
    return num;
  };

  const addressForDelivery = (
    <p
      data-testid={ `seller_orders__element-card-address-${id}` }
      className="mt-2 text-[14px]"
    >
      { `${deliveryAddress}, ${deliveryNumber}` }
    </p>
  );

  return (
    <section
      className="border-black border-t-4 flex m-4 rounded-b-md h-max hover:scale-105
      drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] bg-[#fff] w-[370px] p-2 duration-300"
    >
      <div className="rounded-bl-md mr-2">
        <p
          data-testid={ `${propsPageName}__element-order-id-${id}` }
          className="flex items-center text-[16px] px-4 bg-white h-full
          rounded-md"
        >
          { `Pedido ${id}` }
        </p>
      </div>
      <div className="rounded-br-md w-full">
        <div className="flex items-center justify-between">
          <p
            data-testid={ `${propsPageName}__element-delivery-status-${id}` }
            className={ `flex items-center ${statusColor[status]} h-14 px-4 w-[145px]
            text-[20px] font-bold text-white rounded justify-center` }
          >
            { status }
          </p>
          <div className="flex flex-col justify-between h-14">
            <p
              data-testid={ `${propsPageName}__element-order-date-${id}` }
              className="px-2"
            >
              { `${addZeroToDate(date
                .getDate())}/${addZeroToDate(date
                .getMonth() + 1)}/${addZeroToDate(date
                .getFullYear())}` }
            </p>
            <p
              data-testid={ `${propsPageName}__element-card-price-${id}` }
              className="px-2"
            >
              { `R$ ${totalPrice.replace('.', ',')}` }
            </p>
          </div>
        </div>
        { user.role === 'seller' && addressForDelivery }
      </div>
    </section>
  );
}

OrderCard.propTypes = {
  order: propTypes.shape({
    id: propTypes.number,
    status: propTypes.string,
    saleDate: propTypes.string,
    totalPrice: propTypes.string,
    deliveryAddress: propTypes.string,
    deliveryNumber: propTypes.string,
  }).isRequired,
  propsPageName: propTypes.string.isRequired,
};

export default OrderCard;
