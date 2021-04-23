import * as express from 'express';
import * as auth from '../middleware/authorization';
import UserController from '../controllers/userController';

const userRoutes = (userController: UserController, router: express.Router) => {

    return () => {
        router.get('/users/me', auth.loggedUser, userController.getMe)
        router.get('/users', auth.loggedUser, userController.getAll)
        router.get('/users/:id', [auth.loggedUser, auth.isAdmin], userController.getUser)
        router.post('/users', userController.addUser)
        router.patch("/users/me", auth.loggedUser, userController.updateUser);
        router.patch("/users/:id", [auth.loggedUser, auth.isAdmin], userController.updateUser);
        router.delete("/users/me", auth.loggedUser, userController.deleteUser);
        router.delete("/users/:id", [auth.loggedUser, auth.isAdmin], userController.deleteUser);
        return router;
    }
};
export default userRoutes;