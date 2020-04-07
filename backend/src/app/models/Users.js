import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// Aqui podemos colocar apenas as colunas que serão inseridas pelo usuario

class User extends Model {
  // O metodo abaixo (init) será chamado automaticamente pelo sequelize
  static init(sequelize) {
    /*
      Super indica que estamos usando a classe model,
      e na sequencia usando o init do model

      Para o init, enviamos as colunas que serão inseridas pelo usuario,
      o que é chave estrangeira ou preenchido automaticamente não precisa

      Sequelize.VIRTUAL é um campo que será gerado apenas no lado da aplicação,
      não será gerado na base de dados
    */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        type_acess: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    // Deixa a senha digitada hasheada após o cadastro
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // metodo para checar a senha
  checkPassword(password) {
    // comparando a senha informada com a senha do banco
    return bcrypt.compare(password, this.password_hash);
  }
}

/*
 addHook = uma funcao do sequelize, são trechos de código executados de
 forma automatica, de acordo com ações executados em nosso model.
 No exemplo acima, estou usando o beforeSave com função para o hook executar,
 isso vai fazer com que antes de um usuario ser salvo(criado/editado) no banco de dados, as ins-
 trucoes na funcao sejam executadas.

*/

export default User;
