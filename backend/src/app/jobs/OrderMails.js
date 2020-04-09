import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  // O handle será chamado para o envio de cada e-mail
  async handle({ data }) {
    const { orderExist } = data;

    await Mail.sendMail({
      to: `${orderExist.deliveryman.name} <${orderExist.deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'neworder',
      context: {
        // Aqui informo as variaveis que meu template está esperando
        name: orderExist.recipient.name,
        zip_code: orderExist.recipient.zip_code,
        street: orderExist.recipient.street,
        complement: orderExist.recipient.complement,
        neighborhood: orderExist.recipient.neighborhood,
        city: orderExist.recipient.city,
        state: orderExist.recipient.state,

        deliveryman: orderExist.deliveryman.name,
        productName: orderExist.product,
      },
    });
  }
}

export default new OrderMail();
