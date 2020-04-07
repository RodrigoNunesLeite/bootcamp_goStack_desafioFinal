import * as Yup from 'yup';

import Recipient from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    /* Apenas usuarios admin podem fazer cadastro de destinatarios */
    if (req.acess !== 1) {
      return res
        .status(401)
        .json({ error: 'Registration released only for admin users' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string(),
      complement: Yup.string(),
      neighborhood: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      complement: Yup.string(),
      neighborhood: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const recipientExist = await Recipient.findByPk(req.body.id);

    if (!recipientExist) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    /* preciso passar o recipientExist para o update, porque é o registro que está locado */
    const recipient = await recipientExist.update(req.body);
    return res.json(recipient);
  }
}

export default new RecipientsController();
