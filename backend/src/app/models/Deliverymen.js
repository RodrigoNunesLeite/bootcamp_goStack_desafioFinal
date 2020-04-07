import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );

    return this;
  }

  /*
    Metodo para associacao da chave estrangeira da tabela files

    this.belongsTo = belongsTo significa "pertence", esse model de usuario pertence a um model de file

    as: 'avatar' = É o codinome que estou atribuindo para o relacionamento
  */
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliverymen;
