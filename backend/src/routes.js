// importando apenas a parte de roteamento
import { Router } from 'express';
import multer from 'multer';
// import multerConfig from './config/multer';
import { uplFile, uplSignature } from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UsersController from './app/controllers/UsersController';
import DeliverymenController from './app/controllers/DeliverymenController';
import OrdersController from './app/controllers/OrdersController';
import DeliveriesController from './app/controllers/DeliveriesController';
import FileController from './app/controllers/FileController';
import SignaturesController from './app/controllers/SignaturesController';
import ProblemsController from './app/controllers/ProblemsController';

import authMiddleware from './app/middlewares/auth';

const upload = multer(uplFile);
const uploadSignature = multer(uplSignature);

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
/* rota para busca de destinatario */
routes.get('/recipients/:nomeRec', RecipientsController.index);

/* rota para listagem de entregadores */
routes.get('/deliverymen/:nome', verifyAdm, DeliverymenController.index);
/* rota para cadastro de entregadores */
routes.post('/deliverymen', verifyAdm, DeliverymenController.store);
/* rota para atualização de entregadores */
routes.put('/deliverymen', verifyAdm, DeliverymenController.update);
/* rota para removação de entregadores */
routes.delete('/deliverymen/:id', verifyAdm, DeliverymenController.delete);

/* rota para listagem de encomendas */
routes.get('/orders/:nomeProd', verifyAdm, OrdersController.index);
/* rota para cadastro de encomendas */
routes.post('/orders', verifyAdm, OrdersController.store);
/* rota para atualização de encomendas */
routes.put('/orders/:id', verifyAdm, OrdersController.update);
/* rota para remoção de encomendas */
routes.delete('/orders/:id', verifyAdm, OrdersController.delete);

/* Funcionalidades dos entregadores */
/* Visualizar encomendas */
routes.get('/deliveries/:id/:status', DeliveriesController.index);
/* Retirar encomendas */
routes.put('/withdraw/:id/:deliverymanid', DeliveriesController.withdraw);
/* Finalizar encomenda */
routes.put('/finish/:id/:deliverymanid', DeliveriesController.finish);

/* Rotas para cadastro de problemas */
/* Listar todas as entregas com problemas */
routes.get('/problems/:id', ProblemsController.index);

/* Cadastrar problemas na entrega */
routes.post('/problems/:idOrder/:idDelivery', ProblemsController.store);

/* Cancelar uma entrega baseada no id do problema */
routes.delete('/problems/:idProblem', ProblemsController.delete);

routes.post('/files', upload.single('file'), FileController.store);
routes.post(
  '/signatures',
  uploadSignature.single('file'),
  SignaturesController.store
);

export default routes;
