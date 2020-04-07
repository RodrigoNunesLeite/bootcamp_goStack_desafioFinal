import * as Yup from 'yup';

import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
  async index(req, res) {
    console.log(Deliverymen);
    const deliverymenExists = await Deliverymen.findAll();

    if (!deliverymenExists) {
      return res.status(400).json({ error: 'Deliverymen dont exists.' });
    }

    return res.json(deliverymenExists);
  }

  async store(req, res) {
    const deliverymenExists = await Deliverymen.findOne({
      where: { email: req.body.email },
    });

    if (deliverymenExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    // retorna do cadastro apenas os campos necessários
    const { id, name, email } = await Deliverymen.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new DeliverymenController();
