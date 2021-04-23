import * as express from 'express';
import ScenarioController from '../controllers/scenarioController';

const scenarioRoutes = (scenarioController: ScenarioController, router: express.Router) => {

    return () => {
        router.route("/scenario").get(scenarioController.getAll);
        router.route("/scenario/:id").get(scenarioController.getById);
        router.route("/scenario").post(scenarioController.create);
        router.route("/scenario/:id").patch(scenarioController.update);
        router.route("/scenario/:id").delete(scenarioController.delete);
        return router;
    }
};
export default scenarioRoutes;