import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import requestApi from '../utils/RequestAPI';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [LoginSuccesfull, setLoginSuccesfull] = useState(true);
  const setUser = useLocalStorage('user', {})[1];
  const setToken = useLocalStorage('token', '')[1];
  const history = useHistory();

  useEffect(() => {
    const enabledButton = () => {
      const minimumPassword = 6;
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (
        emailRegex.test(email)
        && password.length >= minimumPassword
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [email, password]);

  const handleEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const login = async () => {
    const badStatus = 404;
    const successStatus = 200;

    const { status, data } = await requestApi('POST', 'login', {
      email,
      password,
    });

    if (status === badStatus) {
      setLoginSuccesfull(false);
    }

    if (status === successStatus) {
      setToken(data.token);
      setUser(data.user);

      if (data.user.role === 'customer') {
        history.push('/customer/products');
      }

      if (data.user.role === 'seller') {
        history.push('/seller/orders');
      }

      if (data.user.role === 'administrator') {
        history.push('/admin/manage');
      }
    }
  };

  const invalidLoginMessage = (
    <span
      data-testid="common_login__element-invalid-email"
    >
      Email ou Senha inválidos
    </span>);

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          Email
          <input
            value={ email }
            onChange={ handleEmailChange }
            data-testid="common_login__input-email"
            id="email-input"
            type="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            value={ password }
            onChange={ handlePasswordChange }
            data-testid="common_login__input-password"
            id="password-input"
            type="password"
            placeholder="Senha"
          />
        </label>
        { !LoginSuccesfull && invalidLoginMessage }
        <button
          onClick={ login }
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
export default Login;
