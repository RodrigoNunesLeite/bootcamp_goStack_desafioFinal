// O * importa tudo que tem dentro da biblioteca yup
import * as Yup from 'yup';

import Users from '../models/Users';

class UsersController {
  async store(req, res) {
    // yup.objetc = pois estamos validando o req.body, que é um objeto
    // .shape({ = o formato que eu quero que o objeto tenha
    // .when da acesso a todos os campos do yup
    // quando o campo .when('oldPassword') estiver preenchido, o password será obrigatorio
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
      type_acess: Yup.number().required(),
    });

    /*
     Verificando se os dados enviados no req.body
     estão de acordo com o schema
     */
    // isValid é uma funcao assincrona, e verifica se o req.body bate com o schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const userExists = await Users.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    // const user = await Users.create(req.body);
    return res.json({ teste: 'teste' });
  }
}

export default new UsersController();
