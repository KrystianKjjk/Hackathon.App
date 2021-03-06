import PasswordController from '../controllers/PasswordController';
import * as express from 'express';

export default function PasswordRoutes(c: PasswordController, router: express.Router) {
    
    return () => {
        router.post('/users/requestpasswordreset', c.requestPasswordReset);
        router.post('/users/resetpassword', c.resetPassword);
        router.post('/users/changepassword', c.changePassword);
        return router;
    }
}

//based on https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/