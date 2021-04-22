import * as express from 'express';
import SampleController from '../controllers/sampleController';

const sampleRoutes = (sampleController: SampleController, router: express.Router) => {

    return () => {
        router.route("/sample").get(sampleController.getAll);
        router.route("/sample/:id").get(sampleController.getById);
        router.route("/sample").post(sampleController.create);
        router.route("/sample/:id").patch(sampleController.update);
        router.route("/sample/:id").delete(sampleController.delete);
        console.log('elo');
        return router;
    }
};
export default sampleRoutes;