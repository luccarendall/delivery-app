import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <div>
      <UserProvider>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/customer/products" />
          <Route path="/register" />
          <Route path="/" render={ () => (<Redirect to="/login" />) } />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
