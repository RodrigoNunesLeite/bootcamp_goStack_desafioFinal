export default {
  host: process.env.MAIL_HOST, // Envio de email via smtp
  port: process.env.MAIL_PORT,
  secure: false, // Verificação do ssl
  auth: {
    // Como se fosse o e-mail e senha
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // configuração padrão
  default: {
    from: 'Equipe FastFeet <noreply@fastfeet.com>',
  },
};
