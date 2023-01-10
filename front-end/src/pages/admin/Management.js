import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import useLocalStorage from '../../hooks/useLocalStorage';
import requestApi from '../../utils/RequestAPI';

function Management() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [badRegister, setBadRegister] = useState(false);
  const [user] = useLocalStorage('user');

  useEffect(() => {
    const enabledButton = () => {
      const minName = 12;
      const minPassword = 6;
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (
        emailRegex.test(email)
        && password.length >= minPassword
        && name.length >= minName
        && role
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [name, email, password, role]);

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

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setRole(value);
  };

  const register = async () => {
    const successStatus = 201;

    const { status } = await requestApi('POST', 'register/admin', {
      name,
      email,
      password,
      role,
    }, { authorization: user.token });

    if (status === successStatus) {
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      setBadRegister(false);
    } else {
      setBadRegister(true);
    }
  };

  const invalidRegisterMessage = (
    <span
      data-testid="admin_manage__element-invalid-register"
      className="text-red-500 font-bold"
    >
      Dados inválidos
    </span>);

  const classInput = `appearance-none p-2 border-b rounded border-grey focus:outline-none
  focus:border-yellow focus:border-b-2 bg-white`;

  const classLabel = `mb-2 text-sm font-medium text-gray-900 dark:text-white mr-4 flex
  flex-col justify-center items-start`;

  const classButton = `shadow bg-yellow hover:bg-h-yellow text-gray-800 font-bold p-2
  rounded disabled:bg-grey duration-200`;

  return (
    <div>
      <NavBar />
      <p className="text-1xl font-medium w-[1037px] mx-auto mt-8">
        Cadastrar novo usuário
      </p>
      <form className="w-max mx-auto bg-white p-2 rounded shadow flex mt-2">
        <label htmlFor="name-input-admin-manage" className={ classLabel }>
          Nome
          <input
            onChange={ handleNameChange }
            data-testid="admin_manage__input-name"
            id="name-input-admin-manage"
            type="name"
            placeholder="Nome e sobrenome"
            value={ name }
            className={ classInput }
          />
        </label>
        <label htmlFor="email-input-admin-manage" className={ classLabel }>
          Email
          <input
            onChange={ handleEmailChange }
            data-testid="admin_manage__input-email"
            id="email-input-admin-manage"
            type="email"
            placeholder="seu-email@site.com.br"
            value={ email }
            className={ classInput }
          />
        </label>
        <label htmlFor="password-input-admin-manage" className={ classLabel }>
          Senha
          <input
            onChange={ handlePasswordChange }
            data-testid="admin_manage__input-password"
            id="password-input-admin-manage"
            type="password"
            placeholder="**********"
            value={ password }
            className={ classInput }
          />
        </label>
        <label htmlFor="role-select-admin-manage" className={ classLabel }>
          Tipo
          <select
            onChange={ handleRoleChange }
            data-testid="admin_manage__select-role"
            id="role-select-admin-manage"
            value={ role }
            className={ classInput }
          >
            <option defaultValue="customer" value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          onClick={ register }
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
          className={ classButton }
        >
          Cadastrar
        </button>
      </form>
      <div className="text-center mt-2">
        { badRegister && invalidRegisterMessage }
      </div>
    </div>
  );
}

export default Management;
