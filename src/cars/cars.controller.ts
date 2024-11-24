import { Request, Response } from 'express';
import { Helpers } from '../helper';
import { carUpdateSchema, carValidationSchema } from './cars.validation';
import { CarsServices } from './cars.service';

// creates car from post request
const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const parsedCarData = carValidationSchema.parse(carData);
    const result = await CarsServices.insertCarToDB(parsedCarData);
    Helpers.sendSuccessResponse(res, {
      message: 'Car created successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error, 422);
  }
};

// retrieves all cars from database
const getAllCars = async (req: Request, res: Response) => {
  try {
    let result = [];
    const queryParams = req.query;
    if (Object.keys(queryParams).length) {
      const searchType = Object.keys(queryParams)[0];
      if (searchType !== 'brand' && searchType !== 'model' && searchType !== 'category') {
        Helpers.sendErrorResponse(
          res,
          new Error("Search term must be on of the followings 'brand', 'model' or 'category'!"),
          422,
        );
        return;
      }
      const searchTerm = queryParams[searchType] as string;
      result = await CarsServices.getCarsFromDB({ searchType, searchTerm });
    } else {
      result = await CarsServices.getCarsFromDB();
    }

    Helpers.sendSuccessResponse(res, {
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error);
  }
};

// get specific car
const getSpecificCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const doesExists: boolean = await CarsServices.isCarExists(carId);
    if (!doesExists) {
      res.status(404).json({
        success: false,
        message: 'Car not found!',
        data: {},
      });
      return;
    }
    const result = await CarsServices.getSingleCarFromDB(carId);
    Helpers.sendSuccessResponse(res, {
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error, 422);
  }
};

// update specific car
const updateSpecificCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const doesExists: boolean = await CarsServices.isCarExists(carId);
    if (!doesExists) {
      res.status(404).json({
        success: false,
        message: 'Car to update was not found!',
        data: {},
      });
      return;
    }
    const updateData = req.body;
    const parsedUpdateData = carUpdateSchema.parse(updateData);
    const result = await CarsServices.updateSpecificCarInDB(carId, parsedUpdateData);
    Helpers.sendSuccessResponse(res, {
      message: 'Car updated successfully',
      data: result,
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error);
  }
};

// delete specific car
const deleteSpecificCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const doesExists: boolean = await CarsServices.isCarExists(carId);
    if (!doesExists) {
      res.status(404).json({
        success: false,
        message: 'Car to delete was not found!',
        data: {},
      });
      return;
    }
    await CarsServices.deleteSpecificCarFromDB(carId);
    Helpers.sendSuccessResponse(res, {
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (e) {
    Helpers.sendErrorResponse(res, e as Error);
  }
};

export const CarsController = {
  createCar,
  getAllCars,
  getSpecificCar,
  updateSpecificCar,
  deleteSpecificCar,
};
