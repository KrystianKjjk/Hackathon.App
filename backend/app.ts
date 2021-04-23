import  mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config.js';
import 'express-async-errors';
import  cors from 'cors';

import Repository from './src/repositories/repository';

import Scenario from './src/models/scenario.model';
import ScenarioService from './src/services/scenarioService';
import ScenarioController from './src/controllers/scenarioController';
import ScenarioRouter from './src/routes/scenarioRouter';

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

//scenario router setup
const scenarioRepository = new Repository(Scenario);
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