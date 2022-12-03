import React from 'react';
import propTypes from 'prop-types';

function OrderCard({ id, status, saleDate, totalPrice }) {
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
    </section>
  );
}

OrderCard.propTypes = {
  id: propTypes.number.isRequired,
  status: propTypes.string.isRequired,
  saleDate: propTypes.instanceOf(date).isRequired,
  totalPrice: propTypes.number.isRequired,
};

export default OrderCard;
