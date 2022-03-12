import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
	// O arquivo vai ser salvo na máquina do servidor
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    //O nome da imagem como um hash usando a biblioteca nativa do node que é a crypto
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (erro, res) => {
        if (erro) return cb(erro);
        
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};