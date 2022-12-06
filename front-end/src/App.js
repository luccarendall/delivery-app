import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import { UserProvider } from './context/userContext';
import Products from './pages/customer/Products';
import Orders from './pages/seller/Orders.js';
import Management from './pages/admin/Management';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <UserProvider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/seller/orders" component={ Orders } />
          <Route path="/administrator/management" component={ Management } />
          <Route path="/register" component={ Register } />
          <Redirect from="/" to="/login" />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
