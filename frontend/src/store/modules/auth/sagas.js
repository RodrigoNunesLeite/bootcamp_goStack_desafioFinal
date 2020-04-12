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
    yield put(signFailure());
  }
}
