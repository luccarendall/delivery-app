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
import OrderDetails from './pages/orderDetails/orderDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <CartProvider>
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/orderDetails/:id" component={ OrderDetails } />
        </CartProvider>
        <Route exact path="/administrator/management" component={ Management } />
        <Route exact path="/register" component={ Register } />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
