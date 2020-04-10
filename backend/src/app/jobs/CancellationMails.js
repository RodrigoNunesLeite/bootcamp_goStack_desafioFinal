import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'cancellationMail';
  }

  // O handle será chamado para o envio de cada e-mail
  async handle({ data }) {
    const { orderExists, problemsExists } = data;

    await Mail.sendMail({
      to: `${orderExists.deliveryman.name} <${orderExists.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        // Aqui informo as variaveis que meu template está esperando
        name: orderExists.recipient.name,
        zip_code: orderExists.recipient.zip_code,
        street: orderExists.recipient.street,
        complement: orderExists.recipient.complement,
        neighborhood: orderExists.recipient.neighborhood,
        city: orderExists.recipient.city,
        state: orderExists.recipient.state,
        deliveryman: orderExists.deliveryman.name,
        productName: orderExists.product,

        description: problemsExists.description,
        codCancel: problemsExists.id,
        dtcancel: format(
          parseISO(orderExists.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm:ss'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new OrderMail();
