import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  // O handle será chamado para o envio de cada e-mail
  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: '',
      subject: 'Nova encomenda',
      template: 'neworder',
      context: {
        // Aqui informo as variaveis que meu template está esperando
      },
    });
  }
}

export default new OrderMail();
