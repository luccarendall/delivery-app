import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import requestApi from '../utils/RequestAPI';
import Footer from '../components/Footer/Footer';
import logo from '../images/logo-maior.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [LoginSuccesfull, setLoginSuccesfull] = useState(true);
  const setUser = useLocalStorage('user', {})[1];
  const history = useHistory();
  const [user] = useLocalStorage('user', '');

  const classInput = `p-2 border-b border-grey focus:outline-none focus:border-yellow 
  focus:border-b-2`;
  const button1 = `mt-4 h-min rounded-sm p-2 
  text-1.5xs font-bold bg-black text-white`;

  const button2 = `mt-4 h-min rounded-sm p-2 
  bg-yellow text-black 1.5text-xs font-bold
  disabled:bg-grey disabled:text-white`;

  const centralizarDiv = 'flex justify-center items-center';

  const divMain = `flex justify-center items-center 
  mt-10 mr-16.25 animate-slide-to-left`;

  useEffect(() => {
    const duzentos = 200;
    const verifyToken = async () => {
      const { data, status } = await requestApi(
        'POST',
        'validate',
        {},
        { authorization: user.token },
      );

      const role = {
        customer: '/customer/products',
        seller: '/seller/orders',
        administrator: '/admin/manage',
      };
      if (status === duzentos) { history.push(role[data.message.role]); }
    };
    verifyToken();
  }, [history, user.token]);

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
      setUser({
        ...data.user,
        token: data.token,
      });

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
      <div className={ divMain }>
        <img className="object-cover h-48 w-86" alt="logo" src={ logo } />
      </div>
      <div className={ centralizarDiv }>
        <form className="flex flex-col items-center w-min animate-slide-to-left">
          <label htmlFor="email-input" className="mt-10">
            Email
            <input
              value={ email }
              onChange={ handleEmailChange }
              data-testid="common_login__input-email"
              id="email-input"
              type="email"
              placeholder="Email"
              className={ classInput }
            />
          </label>
          <label htmlFor="password-input" className="mt-10">
            Senha
            <input
              value={ password }
              onChange={ handlePasswordChange }
              data-testid="common_login__input-password"
              id="password-input"
              type="password"
              placeholder="Senha"
              className={ classInput }
            />
          </label>
          { !LoginSuccesfull && invalidLoginMessage }

          <div>
            <button
              onClick={ login }
              type="button"
              data-testid="common_login__button-login"
              disabled={ isDisabled }
              className={ button1 }
            >
              Login
            </button>

            <button
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => history.push('/register') }
              className={ button2 }
            >
              Registrar
            </button>
          </div>

        </form>
        <Footer />
      </div>
    </div>
  );
}
export default Login;
