import { Router } from 'express';
import multer from  'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from  './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload =  multer(multerConfig);


const users = ['Angelica', 'Yusi', 'Freya'];

routes.get('/users', (req, res) => {
    return res.json(users);
})

routes.get ('/users/:index', (req, res) =>  {
    const {index} = req.params;

    return res.json(users[index]);
})


routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store); 

routes.use(authMiddleware);

routes.put('/users', UserController.update);

//UPLOAD DA IMAGEM

routes.post('/files', upload.single('file'), (req, res) => {
	return res.json({ ok:  true });
});

routes.delete('/users/:index', (req, res) => {
   const { index } = req.params;

   users.splice(index, 1);
   
   return res.json(users);

})
export default routes;
