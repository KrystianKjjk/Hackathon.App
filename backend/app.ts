import  mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config.js';
import 'express-async-errors';
import  cors from 'cors';

import Sample from './src/models/sample.model';
import SampleService from './src/services/sampleService';
import Repository from './src/repositories/repository';
import SampleController from './src/controllers/sampleController';
import sampleRoutes from './src/routes/sampleRoute';

import UserController from './src/controllers/userController';
import userRoutes from './src/routes/userRoute';

import LoginController from './src/controllers/loginController';
import loginRoutes from './src/routes/loginRoute';
// const users = require('./src/routes/userRoute');

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

//sample route setup
const sampleRepository = new Repository(Sample);
const sampleService = new SampleService(sampleRepository);
const sampleController = new SampleController(sampleService);
const sampleRouter = sampleRoutes(sampleController, router);

//user route setup
const userController = new UserController();
const userRouter = userRoutes(userController, router);

//login route setup
const loginController = new LoginController();
const loginRouter = loginRoutes(loginController, router);


app.use("/api", sampleRouter());
app.use("/api", userRouter());
app.use("/api", loginRouter());


app.use((req, res, next) => {
    const error = new Error('Resource not found');
    res.status(404).send({error: error.message});
    next(error);
});

export default app;