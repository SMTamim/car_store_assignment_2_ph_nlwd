import { Car, TCar } from './cars.model';

// // check if a car exists and not deleted in DataBase by _id
// const checkCar = (carId) => {
//   const result = await Car.findById(carId).exists();
// };

// Insert a car to the DataBase
const insertCarToDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

// Retrieve all cars from the DataBase
const getCarsFromDB = async (queryParam?: { searchType: string; searchTerm: string }) => {
  let result;
  if (queryParam !== undefined) {
    const { searchType, searchTerm } = queryParam;
    result = await Car.find({ [searchType]: searchTerm });
  } else {
    result = await Car.find();
  }
  return result;
};

// Retrieve a single car using carId
const getSingleCarFromDB = async (carId: string) => {
  const result = await Car.findById(carId);
  return result;
};

// update a single car using carId
const updateSpecificCarInDB = async (carId: string, updateData: { price: number; quantity: number }) => {
  let result = await Car.findByIdAndUpdate(
    carId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );
  if (result?.quantity ?? 0 > 0) {
    result = await Car.findByIdAndUpdate(
      carId,
      { $set: { inStock: true } },
      {
        new: true,
        runValidators: true,
      },
    );
  }
  return result;
};

// update a single car using carId
const deleteSpecificCarFromDB = async (carId: string) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    {
      $set: { isDeleted: true },
    },
    { new: true, runValidators: true },
  );
  return result;
};

const isCarExists = async (carId: string): Promise<boolean> => {
  return await Car.isCarExists(carId);
};

export const CarsServices = {
  insertCarToDB,
  getCarsFromDB,
  getSingleCarFromDB,
  updateSpecificCarInDB,
  deleteSpecificCarFromDB,
  isCarExists,
};
