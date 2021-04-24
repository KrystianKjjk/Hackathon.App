import * as express from 'express';

import GroupController from '../controllers/groupController';

const groupRoutes = (groupController: GroupController, router: express.Router) => {

    return () => {
        router.route("/group").get(groupController.getAll);
        router.route("/group/:id").get(groupController.getById);
        router.route("/group").post(groupController.create);
        router.route("/group/deactivate").patch(groupController.deactivateAll);
        router.route("/group/:id").patch(groupController.update);
        router.route("/group/:id").delete(groupController.delete);
        router.route("/group/me/:id").get(groupController.getByUserId);
        router.route("/group/batchcreation").post(groupController.createMany);
        router.route("/group/active").get(groupController.getAllActive);
        
        return router;
    }
};




export default groupRoutes;