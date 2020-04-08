import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    // Transporter = É como o nodemailer chama alguma conexão externa
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,

      // Se tiver, envia o usuario, senão envia nulo
      auth: auth.user ? auth : null,
    });

    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    /**
     * Compile = compila nossos templates de e-mail
     * .use = adiciona o comando a seguir para a variavel
     */
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs', // extensao usada nos arquivos
        }),
        viewPath,
        extname: '.hbs',
      })
    );
  }

  // responsavel por enviar o e-mail
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
