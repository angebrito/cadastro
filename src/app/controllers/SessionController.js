import jwt from 'jsonwebtoken';

import authConfing from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(req, res) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email }});

      if (!user) {
          return res.status(401).json({ error : 'Usuário não encontrado.'});
      }
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha não corresponde.'})
      }
      const { id, name } = user;
      return res.json({
          user: {
              id,
              name,
              email,
          },
          token: jwt.sign({ id }, authConfing.secret, {
              expiresIn: authConfing.expiresIn,
          }),
      })
    }
}
export default new SessionController();

