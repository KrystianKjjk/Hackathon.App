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

//group route setup
const groupRepository = new GroupRepository(Group);
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);
const GroupRoutes = groupRoutes(groupController, router);
app.use('/api', GroupRoutes());

app.use((req, res, next) => {
    const error = new Error('Resource not found');
    res.status(404).send({error: error.message});
    next(error);
});

export default app;