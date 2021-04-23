import UserController from '../controllers/UserController';
import * as express from 'express';
import idValidation from '../middlewares/IdValidation';
import { HasId, isAdmin } from '../middlewares/HasRole';

export default function UserRoutes(c: UserController) {
    return (router: express.Router) => {
        router.get('/users/:id', isAdmin, idValidation, c.getUser);
        router.get('/users/me/:id', HasId('id'), idValidation, c.getUserInfoById);
        router.get('/users', isAdmin, c.getAllUsers);
        router.post('/users/register', isAdmin, c.register);
        router.patch('/users/:id', isAdmin, idValidation, c.updateUser);
        router.delete('/users/:id', isAdmin, idValidation, c.deleteUser);
        return router;
    }
}