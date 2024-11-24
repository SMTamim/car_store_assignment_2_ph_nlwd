/**
 * Car API Routes
 */
import express from 'express';
import { CarsController } from './cars.controller';

const router = express.Router();

router.get('/:carId', CarsController.getSpecificCar);
router.put('/:carId', CarsController.updateSpecificCar);
router.delete('/:carId', CarsController.deleteSpecificCar);
router.get('/', CarsController.getAllCars);
router.post('/', CarsController.createCar);

export const CarRoutes = router;
