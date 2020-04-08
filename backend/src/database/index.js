import Sequelize from 'sequelize';

import User from '../app/models/Users';
import Recipient from '../app/models/Recipients';
import Deliverymen from '../app/models/Deliverymen';
import File from '../app/models/Files';
import Order from '../app/models/Orders';
import Signature from '../app/models/Signatures';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliverymen, Order, Signature];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    /* vai enviar a conexão(this.connection) para a variavel init dentro do model */
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
