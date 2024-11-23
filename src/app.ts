import express from 'express';
import cors from 'cors';
import { HomeRoutes } from './home/home.routes';

const app = express();

app.use(cors());

// add parsers
app.use(express.json());

app.get('/', HomeRoutes);

export default app;
