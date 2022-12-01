import React from 'react';

function NavBar() {
  const { name, role } = JSON.parse(localStorage.getItem('user'));
  const roleButton = {
    administrator:
  <button data-testid="customer_products__element-navbar-link-orders" type="button">
    GERENCIAR USUÁRIOS
  </button>,
    seller:
  <button data-testid="customer_products__element-navbar-link-orders" type="button">
    PEDIDOS
  </button>,
    customer:
  <span>
    <button data-testid="customer_products__element-navbar-link-products" type="button">
      PRODUTOS
    </button>
    <button data-testid="customer_products__element-navbar-link-orders" type="button">
      MEUS PEDIDOS
    </button>
  </span>,
  };

  console.log(role);

  return (
    <header>
      <nav>
        { roleButton[role] }
        <span data-testid="customer_products__element-navbar-user-full-name">
          { name }
        </span>
        <button data-testid="customer_products__element-navbar-link-logout" type="button">
          Sair
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
