import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config.js';
import 'express-async-errors';
import  cors from 'cors';

import Group from './src/models/group.model';
import GroupService from './src/services/groupService';
import GroupRepository from './src/repositories/groupRepository';
import GroupController from './src/controllers/groupController';
import groupRoutes from './src/routes/groupRoute'

import Repository from './src/repositories/repository';

// import users from './src/routes/userRoute';
const users = require('./src/routes/userRoute');
import UserController from './src/controllers/userController';
import userRoutes from './src/routes/userRoute';

import LoginController from './src/controllers/loginController';
import loginRoutes from './src/routes/loginRoute';

import Scenario from './src/models/scenario.model';
import ScenarioRepository from './src/repositories/scenarioRepository';
import ScenarioService from './src/services/scenarioService';
import ScenarioController from './src/controllers/scenarioController';
import ScenarioRouter from './src/routes/scenarioRouter';

import PasswordResetTokenModel from './src/models/PasswordResetToken';
import PasswordService from './src/services/PasswordService';
import PasswordController from './src/controllers/PasswordController';
import PasswordRoutes from './src/routes/PasswordRoutes';
import MailingService from './src/services/mailingService';
import * as nodemailer from 'nodemailer';
const second = 1000; // ms
const minute = 60 * second;
const groupTimeout = Number(process.env.GROUP_TIMEOUT) ?? minute;

const app = express();
const router = express.Router();


mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Connected to Atlas MongoDB');
    setInterval( () => {
      console.log('deactivate old groups');
      groupRepository.deactivateOlderThan( new Date( (new Date).getTime() - groupTimeout ) )
    }, minute );
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });


if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: No JWT key present');
  process.exit(0);
}

app.use(cors());
app.use(express.json());

//user route setup
const userController = new UserController();
const userRouter = userRoutes(userController, router);

//login route setup
const loginController = new LoginController();
const loginRouter = loginRoutes(loginController, router);

app.use("/api", userRouter());
app.use("/api", loginRouter());

//password reset setup
const mailingService = new MailingService(nodemailer);
const passwordRepository = new Repository(PasswordResetTokenModel);
const passwordService = new PasswordService(passwordRepository);
const passwordController = new PasswordController(mailingService, passwordService);
const passwordRoutes = PasswordRoutes(passwordController, router);
app.use('/api', passwordRoutes());

//group route setup
const groupRepository = new GroupRepository(Group);
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);
const GroupRoutes = groupRoutes(groupController, router);
app.use('/api', GroupRoutes());

//scenario router setup
const scenarioRepository = new ScenarioRepository(Scenario);
const scenarioService = new ScenarioService(scenarioRepository);
const scenarioController = new ScenarioController(scenarioService);
const scenarioRouter = ScenarioRouter(scenarioController, router);
app.use('/api', scenarioRouter());

app.use((req, res, next) => {
    const error = new Error('Resource not found');
    res.status(404).send({error: error.message});
    next(error);
});

export default app;