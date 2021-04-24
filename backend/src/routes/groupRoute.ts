import * as express from 'express';

import Group from '../models/group.model';
import GroupService from '../services/groupService';
import GroupRepository from '../repositories/groupRepository';
import GroupController from '../controllers/groupController';

const groupRoutes = (groupController: GroupController, router: express.Router) => {

    return () => {
        router.route("/group").get(groupController.getAll);
        router.route("/group/:id").get(groupController.getById);
        router.route("/group").post(groupController.create);
        router.route("/group/:id").patch(groupController.update);
        router.route("/group/:id").delete(groupController.delete);
        router.route("/group/me/:id").get(groupController.getByUserId);
        router.route("/group/batchcreation").post(groupController.createMany);
        router.route("/group/active").get(groupController.getAllActive);
        router.route("/group/deactivate").patch(groupController.deactivateAll);
        return router;
    }
};

const groupRepository = new GroupRepository(Group);
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);
const groupRouter = (router :express.Router) => {groupRoutes(groupController, router)};


export default groupRoutes;