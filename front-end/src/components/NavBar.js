import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function NavBar() {
  const history = useHistory();
  const [user] = useLocalStorage('user', {});
  const { name, role } = user;

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  const buttonAdministrator = (
    <button
      data-testid="customer_products__element-navbar-link-orders"
      type="button"
      onClick={ () => goTo('/administrator/management') }
    >
      GERENCIAR USUÁRIOS
    </button>
  );

  const buttonSeller = (
    <button
      data-testid="customer_products__element-navbar-link-orders"
      type="button"
      onClick={ () => goTo('/seller/orders') }
    >
      PEDIDOS
    </button>
  );

  const buttonCustomer = (
    <span>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        onClick={ () => goTo('/customer/products') }
      >
        PRODUTOS
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ () => goTo('/customer/orders') }
      >
        MEUS PEDIDOS
      </button>
    </span>
  );

  const roleButton = {
    administrator: buttonAdministrator,
    seller: buttonSeller,
    customer: buttonCustomer,
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    goTo('/login');
  };

  return (
    <header>
      <nav>
        { roleButton[role] }
        <span data-testid="customer_products__element-navbar-user-full-name">
          { name }
        </span>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ logout }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
