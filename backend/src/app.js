/*
  Fazendo o import abaixo, as variveis de ambiente do arquivo .env
  vão automaticamente para uma variavel global do node, chamada
  process.env e a partir dai conseguimos acessar as variaveis do nosso .env
*/
import 'dotenv/config';
/*
const express = require('express');
const routes = require('./routes');
*/
// é possivel usar a sintaxe abaixo, por conta do sucrase
import express from 'express';
import routes from './routes';

/* vai executar automaticamente as instruções dentro do database */
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  /* metodos */
  middlewares() {
    // permite a aplicacao receber requisicoes como json
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server;
export default new App().server;
