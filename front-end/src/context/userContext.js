import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export default UserContext;

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const userStorage = localStorage.getItem('user') || JSON.stringify({});
    setUser(JSON.parse(userStorage));

    const tokenStorage = localStorage.getItem('token') || '';
    setToken(tokenStorage);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    token,
    setToken,
    setUser,
  }), [user, token]);

  return (
    <UserContext.Provider value={ contextValue }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
