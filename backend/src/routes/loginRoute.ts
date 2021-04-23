import * as express from 'express';
import LoginController from '../controllers/loginController';

const loginRoutes = (loginController: LoginController, router: express.Router) => {

    return () => {
        router.post('/login', loginController.logging)
        return router;
    }
};
export default loginRoutes;