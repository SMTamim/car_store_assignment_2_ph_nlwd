/**
 * Order Services
 */

import { Car } from '../cars/cars.model';
import { Order, TOrder } from './orders.model';

// insert order to database and reduce the car quantity if succeeded
const insertOrdersIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  if (result) {
    // update the quantity
    await Car.updateCarQuantity(result.car, result.quantity * -1);
  }
  return result;
};

// calculate total revenue from orders
const calculateRevenueOfOrders = async () => {
  const result = await Order.aggregate([
    // lookup stage to find the related car
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    // unwind stage to access the car data
    { $unwind: '$carDetails' },
    // add a field called salePrice to the doc with calculated price of each order
    {
      $addFields: { salePrice: { $multiply: ['$quantity', '$carDetails.price'] } },
    },
    // group stage to sum up all the salePrice for each orders to totalRevenue
    {
      $group: { _id: null, totalRevenue: { $sum: '$salePrice' } },
    },
    // project stage to only show the totalRevenue
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);

  return result[0];
};

export const OrderServices = {
  insertOrdersIntoDB,
  calculateRevenueOfOrders,
};
