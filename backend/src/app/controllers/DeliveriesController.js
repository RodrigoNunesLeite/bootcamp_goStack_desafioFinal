import * as Yup from 'yup';
import {
  setMilliseconds,
  setMinutes,
  setSeconds,
  setHours,
  parseISO,
  endOfDay,
  startOfDay,
  isBefore,
  startOfHour,
} from 'date-fns';

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
    } else {
      // busca as encomendas em aberto e canceladas
      orderExists = await Order.findAll({
        where: {
          deliveryman_id: req.params.id,
          end_date: {
            [Op.is]: null,
          },
        },
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
    }

    if (!orderExists || orderExists.length <= 0) {
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

  async withdraw(req, res) {
    /* Rota para retirada de encomendas */
    const orderExist = await Order.findByPk(req.params.id);

    // Verifica se a encomenda existe
    if (!orderExist) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    const date = parseISO(req.body.start_date);

    const hourStart = startOfHour(date);

    // Verifica se o horario está antes da data atual
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailability = await Order.findOne({
      where: {
        deliveryman_id: req.params.deliverymanid,
        canceled_at: null,
        start_date: hourStart,
        id: {
          [Op.ne]: req.params.id,
        },
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // converter a data para um objeto de data
    /*
    const startDate_ini = setHours(
      setMinutes(
        setSeconds(setMilliseconds(parseISO(req.body.start_date), 0), 0),
        0
      ),
      0
    );
    const startDate_fim = addHours(startDate_ini, 24);
*/
    // console.log(startDate_ini, startDate_fim);
    /* O entregador só pode fazer 5 retiradas por dia. */
    const qtdOrders = await Order.findAndCountAll({
      where: {
        deliveryman_id: req.params.deliverymanid,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (qtdOrders >= 5) {
      return res
        .status(400)
        .json({ error: 'Five deliveries per day are allowed' });
    }

    const iniTime = setHours(
      setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0),
      8
    );
    const endTime = setHours(
      setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0),
      18
    );

    if (date < iniTime || date > endTime) {
      return res.status(400).json({ error: 'Invalid schedule' });
    }

    /* Se passar pelas condições acima, atualiza a data de retirada */
    await orderExist.update(req.body);

    const orderUpdt = await Order.findByPk(req.params.id, {
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

    return res.json(orderUpdt);
  }

  async finish(req, res) {
    const { id } = req.params;

    const orderExist = await Order.findByPk(id);

    if (!orderExist) {
      return res.status(400).json({ error: 'Order does not exist.' });
    }

    await orderExist.update({
      end_date: Date(),
    });

    const orderUpdt = await Order.findByPk(id, {
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

    return res.json(orderUpdt);
  }
}

export default new DeliveriesController();
