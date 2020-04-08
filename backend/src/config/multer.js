/* Configuração do upload de arquivos */
import multer from 'multer';
import crypto from 'crypto';
/*
 Importando apenas 2 funcoes do path
 extname - para verificar a extensão do arquivo
 resolve - para percorrer um caminho dentro da aplicação
*/
import { extname, resolve } from 'path';

/* gerando objeto de configuração */
export default {
  /*
    storage = como o multer vai guardar nossos arquivos de imagem
    diskStorage = recebe 2 propriedades (destination e filename)

    filename: apesar de ser uma propriedade, aceita uma função

    crypto.randomBytes =
       - Estamos adicionando um codigo unico na frente do nome
       de cada imagem. O crypto é uma biblioteca que ja vem com o node e nos ajuda
       a gerar codigos aleatorios
       - 16 = será gerado um valor com 16 bytes
       - Não usamos async await, pois é uma função que utiliza callback
       - filename: (req  = ficam todos os detalhes do arquivo
    */
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      /* Formatação do nome do arquivo */
      /*
        cb que é o terceiro parametro de filaname, é a função que precisamos
        retornar com o erro ou sucesso.
      */
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        /*
          O primeiro parametro do callback remete a um erro, como
          nesse ponto não temos erro, enviamos null.
        */
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
