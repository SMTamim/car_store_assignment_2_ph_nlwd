import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/', OrderController.orderCreate);
router.get('/revenue', OrderController.getRevenue);

export const OrderRoutes = router;
