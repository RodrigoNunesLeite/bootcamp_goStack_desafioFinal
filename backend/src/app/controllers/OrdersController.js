import * as Yup from 'yup';

import Order from '../models/Orders';
import Recipient from '../models/Recipients';
import Deliveryman from '../models/Deliverymen';

import OrderMail from '../jobs/OrderMails';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const orderExists = await Order.findAll();

    if (!orderExists) {
      return res.status(400).json({ error: 'Orders does not exists.' });
    }

    return res.json(orderExists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const recipientExists = await Recipient.findByPk(req.body.recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    const deliverymanExists = await Deliveryman.findByPk(
      req.body.deliveryman_id
    );

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const order = await Order.create({
      recipient_id: req.body.recipient_id,
      deliveryman_id: req.body.deliveryman_id,
      product: req.body.product,
    });

    const { id } = order;

    const orderExist = await Order.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'complement',
            'neighborhood',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });

    // Chama a execução da fila para envio de e-mail
    await Queue.add(OrderMail.key, {
      orderExist,
    });

    return res.json(orderExist);
  }

  async update(req, res) {}
}

export default new OrderController();
