import React, { useContext } from 'react';
import propTypes from 'prop-types';
import userContext from '../../context/userContext';

function OrderCard({ order }) {
  const { user } = useContext(userContext);
  const { id,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    deliveryNumber } = order;

  const dateObject = new Date(saleDate);

  const addressForDelivery = (
    <div className="order-delivery-address">
      <p data-testid={ `seller_orders__element-card-address-${id}` }>
        { `${deliveryAddress}, ${deliveryNumber}` }
      </p>
    </div>
  );

  return (
    <section className="order-card">
      <div className="order-number">
        <p data-testid={ `customer_orders__element-order-id-${id}` }>
          { `Pedido ${id}` }
        </p>
      </div>
      <div className="order-status">
        <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
          { status }
        </p>
      </div>
      <div className="order-sale-date">
        <p data-testid={ `customer_orders__element-order-date-${id}` }>
          {
            `${dateObject.getDay()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`
          }
        </p>
      </div>
      <div className="order-total-price">
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          { `R$ ${totalPrice}` }
        </p>
      </div>
      { user.role === 'seller' && addressForDelivery }
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
};

export default OrderCard;
