import * as express from "express";
import AuthController from "../controllers/AuthController";
import validate from "../middlewares/Validate"
import { validateUserLogin, validateUserRegistration } from "../models/User.model";

export default (controller: AuthController) => (router: express.Router) => {
    router.route("/register").all(validate(validateUserRegistration)).post(controller.register);
    router.route("/login").all(validate(validateUserLogin)).post(controller.login);
    return router;
};
