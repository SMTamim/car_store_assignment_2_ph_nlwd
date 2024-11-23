/**
 * Home Routes
 */

import express from 'express';
import { HomeControllers } from './home.controllers';
const router = express.Router();

router.get('/', HomeControllers.index);

export const HomeRoutes = router;
