import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

/**
 * history é usado para navegação do usuário
 */
import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      // aqui vão os dados que enviamos na api
      email,
      password,
    });

    const { token, user } = response.data;

    /**
     * defaults é uma propriedade do axios,
     * onde podemos setar informações que
     * serão enviadas em todas as requisiçoes
     *
     * Nesse caso, estamos setando o header das
     * requisições
     */
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/deliveries');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    console.tron.warn(err);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // redireciona para a tela de login;
    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

/**
 * Sempre que o takeLatest ouvir a chamada da action
 * @auth/SIGN_IN_REQUEST, ele executa a funcao signIn()
 */

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
