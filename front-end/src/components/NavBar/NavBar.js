import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import rock from '../../images/rockGlass.svg';
import userIcon from '../../images/user-icon.png';

function NavBar() {
  const history = useHistory();
  const [user] = useLocalStorage('user', {});
  const { name, role } = user;
  const classButtom = 'bg-yellow rounded-sm px-3 py-1 mx-2 hover:bg-h-yellow';

  const goTo = (endpoint) => {
    history.push(endpoint);
  };

  const buttonAdministrator = (
    <button
      data-testid="customer_products__element-navbar-link-orders"
      type="button"
      className={ classButtom }
      onClick={ () => goTo('/administrator/management') }
    >
      GERENCIAR USUÁRIOS
    </button>
  );

  const buttonSeller = (
    <button
      data-testid="customer_products__element-navbar-link-orders"
      type="button"
      className={ classButtom }
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
        className={ classButtom }
        onClick={ () => goTo('/customer/products') }
      >
        PRODUTOS
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        className={ classButtom }
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
    <header className="drop-shadow-md border-0 bg-grey mb-12">
      <nav className="flex items-center h-14 justify-between bg-white">
        <div className="flex items-center">
          <img src={ rock } alt="Icone do e-commerce" className="w-10 inline mx-3" />
          <span className="mr-3 font-bold text-xl">Drinks E-Commerce</span>
          { roleButton[role] }
        </div>
        <div className="flex items-center">
          <img src={ userIcon } alt="Icone do usuario" className="w-8 inline mx-3" />
          <span
            data-testid="customer_products__element-navbar-user-full-name"
            className="text-xl mr-6"
          >
            { name }
          </span>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            className={ `${classButtom} bg-black text-white hover:bg-grey font-bold` }
            onClick={ logout }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
