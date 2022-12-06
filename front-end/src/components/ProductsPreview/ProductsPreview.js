import React, { useContext } from 'react';
import cartContext from '../../context/cartContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function ProductsPreview({ propsProducts }) {
  const { removeProduct } = useContext(cartContext);
  const [user] = useLocalStorage('user', {});

  const removeColumn = (
    <th>
      Remover Item
    </th>
  );

  const removeButton = (product, index) => (
    <td>
      <button
        type="button"
        data-testid={
          `customer_checkout__element-order-table-remove-${index}`
        }
        onClick={ () => removeProduct(product) }
      >
        Remover
      </button>
    </td>
  );

  return (
    <section className="sale-card">
      <table className="sale-card-products-list">
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Descricão
            </th>
            <th>
              Quantidade
            </th>
            <th>
              Valor Unitário
            </th>
            <th>
              Sub-total
            </th>
            { user.role === 'customer' && removeColumn }
          </tr>
        </thead>

        <tbody>
          {propsProducts.length && propsProducts.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
                { product.name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { product.qty }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${product.price}` }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${(product.qty * product.price).toFixed(2)}`}
              </td>
              { user.role === 'customer' && removeButton(product, index) }
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sale-card-total-price">
        <p data-testid="customer_checkout__element-order-total-price">
          { `Total: R$ ${propsProducts.reduce((acc, cur) => {
            acc += (cur.qty * cur.price);
            return acc;
          }, 0).toFixed(2)}`}
        </p>
      </div>
    </section>
  );
}

ProductsPreview.propTypes = {
  propsProducts: propTypes.arrayOf.isRequired,
};

export default ProductsPreview;
