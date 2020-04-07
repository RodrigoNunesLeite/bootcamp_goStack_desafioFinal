// migration para adicionar um novo campo para a tabela de usuarios

/*
  MANUAL
  O trecho abaixo é referente ao novo campo avatar_id, são as propriedades do campo
   {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id'},
      }
  - type: Sequelize.INTEGER: Tipo do campo que está sendo criado.
  - references: { model: 'files', key: 'id'}: Criando chave estrangeira, está apontando a tabela
    files de model e indicando que o campo id da tabela files, vai ser a chave estrangeira, fazendo
    referencia ao novo campo avatar_id
  - onUpdate: '': Indica o que vai acontecer se o registro da tabela de chave estrangeira(files),
    for atualizado.
     - CASCADE: Se o registro for alterado, também é alterado na tabela de usuários
  - onDelete: '' : Indica o que vai acontecer se o registro da tabela de chave estrangeira(files),
    for deletado.
     - SET NULL: Se for deletado, o campo fica nulo na tabela de usuarios
*/

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliverymen', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverymen');
  },
};
