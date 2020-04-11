import React from 'react';
import { ToastContainer } from 'react-toastify';

/**
 * Usado para exibir mensagem de erro
 */

/**
  * PersistGate = renderizar o conteudo das nossas
  * rotas somente depois de buscar as informações
  * no storage da nossa aplicação
  */
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <Router>
      <Routes />
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
