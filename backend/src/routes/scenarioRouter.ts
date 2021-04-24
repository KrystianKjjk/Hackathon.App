import * as express from 'express';
import ScenarioController from '../controllers/scenarioController';
const { loggedUser, isAdmin } = require('../middleware/authorization');

const scenarioRoutes = (scenarioController: ScenarioController, router: express.Router) => {

    return () => {
        router.route("/scenarios").get(scenarioController.getAll);
        router.route("/scenarios/:id").get(scenarioController.getById);
        router.route("/scenarios").post(scenarioController.create);
        router.route("/scenarios/:id").patch(scenarioController.update);
        router.route("/scenarios/:id/quest/:questIdx/take/decision/:decisionIdx").patch(loggedUser, scenarioController.takeDecision);
        router.route("/scenarios/:id/quest/:questIdx/untake/decision/:decisionIdx").patch(loggedUser, scenarioController.untakeDecision);
        router.route("/scenarios/:id").delete(scenarioController.delete);
        return router;
    }
};
export default scenarioRoutes;