/**
 * Aqui usamos o node e como importamos o react-app-rewired
 * ele vai ler esse arquivo automaticamente
 */
const { addBabelPlugin, override } = require('customize-cra');

/**
 * Substituo algumas informações do create-react-app
 *
 * instalo o plugin yarn add babel-plugin-root-import -D
 */
/**
 * Com o config-overrides, conseguimos trocar os ../ nos caminhos
 * das pastas, por ~(tio) e isso faz com que a busca dos arquivos
 * parta diretamente da pasta src
 */
module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src', // qual a pasta que estou colocando a maioria do meu código
    },
  ])
);
