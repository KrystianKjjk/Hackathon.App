import * as express from 'express';
import * as auth from '../middleware/authorization';
import UserController from '../controllers/userController';

const userRoutes = (userController: UserController, router: express.Router) => {

    return () => {
        router.get('/users',[auth.loggedUser], userController.getAll)
        router.get('/users/:id', [auth.loggedUser], userController.getUser)
        router.post('/users', userController.addUser)
        router.patch("/users/:id", [auth.loggedUser], userController.updateUser);
        router.delete("/users/:id", [auth.loggedUser], userController.deleteUser);
        console.log('elo user');
        return router;
    }
};
export default userRoutes;