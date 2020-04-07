import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/Users';

class SessionController {
  async store(req, res) {
    // yup.objetc = pois estamos validando o req.body, que é um objeto
    // .shape({ = o formato que eu quero que o objeto tenha
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    /*
     Verificando se os dados enviados no req.body
     estão de acordo com o schema
     */
    // isValid é uma funcao assincrona, e verifica se o req.body bate com o schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Se o usuario não existir retorna erro
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Verifica se a senha está de acordo com a base de dados
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    /* retornando um json com o token e dados do usuário */
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
