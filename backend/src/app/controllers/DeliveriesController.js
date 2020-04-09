import * as Yup from 'yup';

import { Op } from 'sequelize';
import Order from '../models/Orders';
import Recipient from '../models/Recipients';
import Deliveryman from '../models/Deliverymen';
import Signature from '../models/Signatures';

import OrderMail from '../jobs/OrderMails';
import Queue from '../../lib/Queue';

class DeliveriesController {
  async index(req, res) {
    let orderExists;
    // Busca as encomendas entregues por ele

    if (req.params.status === '1') {
      orderExists = await Order.findAll({
        where: {
          deliveryman_id: req.params.id,
          end_date: {
            [Op.ne]: null,
          },
        },
      });
    } else {
      // busca as encomendas em aberto e canceladas
      orderExists = await Order.findAll({
        where: {
          deliveryman_id: req.params.id,
          end_date: {
            [Op.is]: null,
          },
        },
      });
    }

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

  async update(req, res) {
    // Verifica se encomenda existe
    const OrderExists = await Order.findByPk(req.params.id);

    if (!OrderExists) {
      return res.status(400).json({ error: 'Order does not exist.' });
    }

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
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
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }

    const signatureExists = await Signature.findByPk(req.body.signature_id);

    if (!signatureExists) {
      return res.status(400).json({ error: 'Signature does not exists' });
    }

    const updtOrder = await OrderExists.update(req.body);

    return res.json(updtOrder);
  }

  async delete(req, res) {
    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    orderExists.canceled_at = new Date();

    await orderExists.save();

    return res.json(orderExists);
  }
}

export default new DeliveriesController();
