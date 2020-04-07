module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true, // define coluna createAt e updateAt
    underscored: true,
    underscoredAll: true,
  },
};
