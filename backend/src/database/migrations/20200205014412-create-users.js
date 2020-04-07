module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        /* nao permite e-mail repetido */
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_acess: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      /* os campos abaixo são preenchidos automaticamente pelo sequelize */
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
  /* executado com desfaço a migrate */
  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
