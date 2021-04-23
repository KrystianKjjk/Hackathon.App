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
// import users from './src/routes/userRoute';
const users = require('./src/routes/userRoute');

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
app.use('/api', sampleRouter());

app.use('/api/users', users);

app.use((req, res, next) => {
    const error = new Error('Resource not found');
    res.status(404).send({error: error.message});
    next(error);
});

export default app;