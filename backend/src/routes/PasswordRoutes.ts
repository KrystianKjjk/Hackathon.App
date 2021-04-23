import PasswordController from '../controllers/PasswordController';
import * as express from 'express';
import { isAdmin } from '../middlewares/HasRole';


export default function PasswordRoutes(c: PasswordController) {
    return (router: express.Router) => {
        router.post('/users/requestpasswordreset', c.requestPasswordReset);
        router.post('/users/resetpassword', c.resetPassword);
        router.post('/users/changepassword', isAdmin, c.changePassword);
        return router;
    }
}

//based on https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/