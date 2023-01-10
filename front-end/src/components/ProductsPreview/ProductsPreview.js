import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cartContext from '../../context/cartContext';

function ProductsPreview({ propsProducts, propsPageName }) {
  const { removeProduct } = useContext(cartContext);
  const { location: { pathname } } = useHistory();

  const columns = `px-3 
  rounded py-1 mx-2 text-zinc-800 font-bold text-sm`;

  const classButton = `bg-red-500 px-3 
  rounded py-1 mx-2 text-white font-bold text-sm`;

  const styleItem = 'bg-yellow px-3 py-1 mx-2 font-bold rounded-l-lg';

  const styleDescription = `bg-gray-200 
  px-3 py-1 mx-2 text-zinc-800 font-bold`;

  const styleQty = `bg-[#EB8636] 
  px-3 py-1 mx-2 text-center text-white font-bold`;

  const stylePrice = `bg-h-yellow  ml-2
  px-3 py-1 mx-2 text-center text-white font-bold`;

  const styleSubTotal = `bg-[#4084e9] ml-2
  px-3 py-1 mx-2 text-center text-white font-bold rounded-r-lg`;

  const styleTotal = `ml-2
  px-3 py-1 mx-2 text-center text-zinc-800 text-xl font-bold`;

  const removeButton = (product, index) => (
    <td>
      <button
        type="button"
        data-testid={ `${propsPageName}__element-order-table-remove-${index}` }
        onClick={ () => removeProduct(product.id) }
        className={ classButton }
      >
        X
      </button>
    </td>
  );

  return (
    <section className="sale-card w-full">
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr
            className={ columns }
          >
            <th>Item</th>
            <th>Descricão</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            {/* {pathname.includes('checkout') && removeColumn} */}
            {pathname.includes('checkout')}
          </tr>
        </thead>

        <tbody>
          {propsProducts.length
            && propsProducts.map((product, index) => (
              <tr key={ product.id }>
                <td
                  className={ styleItem }
                  data-testid={
                    `${propsPageName}__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  className={ styleDescription }
                  data-testid={ `${propsPageName}__element-order-table-name-${index}` }
                >
                  {product.name}
                </td>
                <td
                  className={ styleQty }
                  // style={ { display: 'flex', justifyContent: 'center' } }
                  data-testid={
                    `${propsPageName}__element-order-table-quantity-${index}`
                  }
                >
                  {product.SaleProduct.quantity}
                </td>
                <td
                  className={ stylePrice }
                  data-testid={
                    `${propsPageName}__element-order-table-unit-price-${index}`
                  }
                >
                  {`${product.price.replace('.', ',')}`}
                </td>
                <td
                  className={ styleSubTotal }
                  data-testid={
                    `${propsPageName}__element-order-table-sub-total-${index}`
                  }
                >
                  {`${(
                    parseFloat(product.SaleProduct.quantity)
                    * parseFloat(product.price)
                  ).toFixed(2).replace('.', ',')}`}
                </td>
                {pathname.includes('checkout') && removeButton(product, index)}
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <p
          className={ styleTotal }
          data-testid={ `${propsPageName}__element-order-total-price` }
        >
          Total: R$
          {' '}
          {`${propsProducts
            .reduce((acc, cur) => {
              acc += parseFloat(cur.SaleProduct.quantity) * parseFloat(cur.price);
              return acc;
            }, 0)
            .toFixed(2).replace('.', ',')}`}
        </p>
      </div>
    </section>
  );
}

ProductsPreview.propTypes = {
  propsProducts: propTypes.arrayOf(propTypes.shape()).isRequired,
  propsPageName: propTypes.string.isRequired,
};

export default ProductsPreview;
