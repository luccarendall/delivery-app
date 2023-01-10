import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Products from './pages/customer/Products';
import SellerOrders from './pages/seller/SellerOrders';
import SellerOrderDetails from './pages/seller/SellerOrderDetails';
import Management from './pages/admin/Management';
import Register from './pages/Register';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerOrderDetail from './pages/customer/CustomerOrderDetails';
import { CartProvider } from './context/cartContext';
import CustomerCheckout from './pages/customer/Checkout';

function App() {
  return (
    <div>
      <CartProvider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route exact path="/customer/checkout" component={ CustomerCheckout } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/admin/manage" component={ Management } />
          <Route exact path="/register" component={ Register } />
          <Redirect from="/" to="/login" />
        </Switch>
      </CartProvider>
    </div>
  );
}

export default App;
