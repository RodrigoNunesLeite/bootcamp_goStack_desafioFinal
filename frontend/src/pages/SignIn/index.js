import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

/**
 * Exportamos com * porque essa biblioteca não tem
 * um export default por padrão
 */
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  /**
   * O valor dentro da funcion handleSubmit, vem do data,
   * por conta da biblioteca unform, conseguimos
   * usar desta forma
   */

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  /**
   * Essa funcao vai receber todos os campos do
   * nosso submit
   *
   * A biblioteca unform facilita esse processo de
   * capturar os dados do nosso formulário
   */
  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />
        <div>
          <text>SEU E-MAIL</text>

          <Input name="email" type="email" placeholder="Seu e-mail" />
          <text>SUA SENHA</text>
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </button>
          <Link to="/register">Criar conta gratuita</Link>
        </div>
      </Form>
    </>
  );
}
