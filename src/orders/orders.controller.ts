/**
 * Orders Controller
 */

import { Request, Response } from 'express';
import { Helpers } from '../helper';
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.service';
import { Car } from '../cars/cars.model';
import { Types } from 'mongoose';

// handle order creation post route
const orderCreate = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // parse request data with zod
    const parsedOrderData = orderValidationSchema.parse(orderData);
    const orderDataWithCarObjectId = {
      ...parsedOrderData,
      car: new Types.ObjectId(parsedOrderData.car),
    };
    // checks is the order car exists and has the quantity requested
    if (!(await Car.isCarExists(parsedOrderData.car))) {
      res.status(404).json({
        success: false,
        message: 'Requested Car was not found!',
        data: {},
      });
      return;
    } else {
      const carQuantity = await Car.getCarQuantity(parsedOrderData.car);
      if (carQuantity < parsedOrderData.quantity) {
        res.status(200).json({
          success: false,
          message: `Only "${carQuantity}" car(s) left of the given model. You asked for "${parsedOrderData.quantity}".`,
          data: {},
        });
        return;
      }
    }
    // finally create the order and adjust the original car quantity
    const result = await OrderServices.insertOrdersIntoDB(orderDataWithCarObjectId);
    Helpers.sendSuccessResponse(res, {
      message: 'Order created successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error);
  }
};

// handle get revenue route
const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateRevenueOfOrders();
    Helpers.sendSuccessResponse(res, {
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error);
  }
};

export const OrderController = {
  orderCreate,
  getRevenue,
};
