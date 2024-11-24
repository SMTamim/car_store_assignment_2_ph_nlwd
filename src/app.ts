import express from 'express';
import cors from 'cors';
import { HomeRoutes } from './home/home.routes';
import { CarRoutes } from './cars/car.routes';
import { OrderRoutes } from './orders/orders.routes';

// initialize the express app
const app = express();

// add cors policy
app.use(cors());

// add parsers
app.use(express.json());

// setup the routes to the app
app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', HomeRoutes);

export default app;
