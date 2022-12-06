import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import { UserProvider } from './context/userContext';
import Products from './pages/customer/Products';
import SellerOrders from './pages/seller/SellerOrders';
import Management from './pages/admin/Management';
import CustomerOrders from './pages/customer/CustomerOrders';

function App() {
  return (
    <div>
      <UserProvider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route path="/seller/orders" component={ SellerOrders } />
          <Route path="/administrator/management" component={ Management } />
          <Route path="/register" />
          <Redirect from="/" to="/login" />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
