import express from 'express';
import cors from 'cors';
import { HomeRoutes } from './home/home.routes';

// initialize the express app
const app = express();

// add cors policy
app.use(cors());

// add parsers
app.use(express.json());

// setup the routes to the app
app.get('/', HomeRoutes);

export default app;
