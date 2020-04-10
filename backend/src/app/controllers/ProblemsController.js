import * as Yup from 'yup';

import DeliveryProblems from '../models/Delivery_problems';
import Order from '../models/Orders';
import Deliveryman from '../models/Deliverymen';
import Recipient from '../models/Recipients';

import cancellationMail from '../jobs/CancellationMails';
import Queue from '../../lib/Queue';

class ProblemsController {
  async index(req, res) {
    let problemsExists;

    if (req.params.id !== '0') {
      problemsExists = await DeliveryProblems.findAll({
        where: {
          delivery_id: req.params.id,
        },
      });
    } else {
      problemsExists = await DeliveryProblems.findAll();
    }

    if (!problemsExists || problemsExists.length <= 0) {
      return res.status(400).json({ error: 'Problems does not exist' });
    }

    return res.json(problemsExists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { idOrder, idDelivery } = req.params;

    const orderExists = await Order.findByPk(idOrder, {
      where: {
        deliveryman_id: idDelivery,
      },
    });

    if (!orderExists) {
      return res.status(400).json({ error: 'Order does not exist.' });
    }

    const createProblem = await DeliveryProblems.create({
      delivery_id: idDelivery,
      description: req.body.description,
    });

    return res.json(createProblem);
  }

  async delete(req, res) {
    const { idProblem } = req.params;

    const problemsExists = await DeliveryProblems.findByPk(idProblem);

    if (!problemsExists) {
      return res.status(400).json({ error: 'Problems does not exist.' });
    }

    const orderExists = await Order.findByPk(problemsExists.delivery_id, {
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

    if (!orderExists) {
      return res.status(400).json({ error: 'Order Does not exist.' });
    }

    orderExists.canceled_at = new Date();

    await orderExists.save();

    // Chama a execução da fila para envio de e-mail
    await Queue.add(cancellationMail.key, {
      problemsExists,
      orderExists,
    });

    return res.json(orderExists);
  }
}

export default new ProblemsController();
