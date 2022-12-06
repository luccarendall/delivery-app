import React, { useContext } from 'react';
import propTypes from 'prop-types';
import userContext from '../../context/userContext';

function OrderCard({
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber }) {
  const { user } = useContext(userContext);

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
          { saleDate }
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
  id: propTypes.number.isRequired,
  status: propTypes.string.isRequired,
  saleDate: propTypes.instanceOf(Date).isRequired,
  totalPrice: propTypes.number.isRequired,
  deliveryAddress: propTypes.string.isRequired,
  deliveryNumber: propTypes.string.isRequired,
};

export default OrderCard;
