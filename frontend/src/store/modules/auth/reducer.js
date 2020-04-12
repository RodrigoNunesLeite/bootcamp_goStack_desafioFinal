/**
 * produce é usado para manipular o estado
 */
import produce from 'immer';

/**
 * o reducer sempre vai ser uma função,
 * recebe o estado inicial e devolve o estado alterado
 * de acordo com a action
 */

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

/**
 * Aqui dentro do parametro action, este meu payload, com
 * todas as informações que define no action
 */

export default function auth(state = INITIAL_STATE, action) {
  /**
   * Nesse ponto pega nosso estado, crio um draft dele e
   * manipulo os dados como quiser
   */
  return produce(state, (draft) => {
    switch (action.type) {
      // Aqui definimos o que acontece a cada action definida
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
