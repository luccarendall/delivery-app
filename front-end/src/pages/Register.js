import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { registerSchema } from '../schemas/registerSchema';
import requestApi from '../utils/RequestAPI';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [badRegister, setBadRegister] = useState(false);
  const setUser = useLocalStorage('user', {})[1];
  const history = useHistory();

  useEffect(() => {
    const enabledButton = () => {
      const { error } = registerSchema.validate({ name, email, password });
      if (!error) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [name, email, password]);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const register = async () => {
    const successStatus = 201;

    const { status } = await requestApi('POST', 'register', {
      name,
      email,
      password,
    });

    if (status === successStatus) {
      const { data } = await requestApi('POST', 'login', { email, password });
      setUser({
        ...data.user,
        token: data.token,
      });
      history.push('/customer/products');
    }
    setBadRegister(true);
  };

  const invalidRegisterMessage = (
    <span
      data-testid="common_register__element-invalid_register"
      className="text-red-500 font-bold mt-4"
    >
      Dados inválidos
    </span>);

  return (
    <div className="flex flex-col items-center mt-44">
      <h3 className="text-2xl mb-4">Cadastro</h3>
      <form
        className={ `flex flex-col items-center bg-yellow w-min p-4 rounded-sm
        shadow-lg` }
      >
        <label htmlFor="name-input-register">
          Nome
          <input
            onChange={ handleNameChange }
            data-testid="common_register__input-name"
            id="name-input-register"
            type="name"
            placeholder="Seu Nome"
            className="flex flex-col rounded p-2 border border-grey"
          />
        </label>
        <label htmlFor="email-input-register" className="pt-2">
          Email
          <input
            onChange={ handleEmailChange }
            data-testid="common_register__input-email"
            id="email-input-register"
            type="email"
            placeholder="seu-email@site.com.br"
            className="flex flex-col rounded p-2 border border-grey"
          />
        </label>
        <label htmlFor="password-input-register" className="pt-2">
          Senha
          <input
            onChange={ handlePasswordChange }
            data-testid="common_register__input-password"
            id="password-input-register"
            type="password"
            placeholder="***********"
            className="flex flex-col rounded p-2 border border-grey"
          />
        </label>
        <button
          onClick={ register }
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          className="mt-4 w-full rounded p-2 bg-black text-white disabled:bg-grey"
        >
          CADASTRAR
        </button>
      </form>
      { badRegister && invalidRegisterMessage }
    </div>
  );
}
