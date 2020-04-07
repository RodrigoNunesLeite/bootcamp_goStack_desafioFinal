// importando apenas a parte de roteamento
import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UsersController from './app/controllers/UsersController';
import DeliverymenController from './app/controllers/DeliverymenController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/* rota para cadastro da sessão */
routes.post('/sessions', SessionController.store);

/* rota para cadastro de usuarios */
routes.post('/users', UsersController.store);

// Rota para autenticacao do usuario - Se a middleware retornar false, nada daqui para baixo será executado
routes.use(authMiddleware);

// Middleware para verificar se usuario é administrador
function verifyAdm(req, res, next) {
  if (req.acess !== 1) {
    return res.status(401).json({ error: 'User does not administrator' });
  }
  next();
}

/* rota para cadastro do destinatario */
routes.post('/recipients', RecipientsController.store);

/* rota para atualizacao do destinatario */
routes.put('/recipients', RecipientsController.update);

/* rota para listagem de entregadores */
routes.get('/deliverymen', verifyAdm, DeliverymenController.index);
/* rota para cadastro de entregadores */
routes.post('/deliverymen', verifyAdm, DeliverymenController.store);
/* rota para atualização de entregadores */
routes.put('/deliverymen', verifyAdm, DeliverymenController.update);
/* rota para removação de entregadores */
routes.delete('/deliverymen/:id', verifyAdm, DeliverymenController.delete);

export default routes;
