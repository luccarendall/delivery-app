import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Products from './pages/customer/Products';
import SellerOrders from './pages/seller/SellerOrders';
import Management from './pages/admin/Management';
import Register from './pages/Register';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerOrderDetail from './pages/customer/CustomerOrderDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route path="/administrator/management" component={ Management } />
        <Route path="/register" component={ Register } />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
