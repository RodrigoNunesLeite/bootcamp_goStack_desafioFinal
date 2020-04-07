import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/Users';

// pega uma funcao callback e nos permite usar ela com async await

// contem a palavra chave para formação do token
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // dividindo o header em um array
  // com a virgula no array, indica que estou descartando a primeira
  // posição e usando apenas a segunda
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    req.acess = user.type_acess;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
