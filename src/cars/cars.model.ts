import { Model, Schema, Types, model } from 'mongoose';

// define Car type
export type TCar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// defile mongoose schema fro Car type
export const carSchema = new Schema<TCar, CarModel>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      },
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.isDeleted;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.isDeleted;
        return ret;
      },
    },
  },
);

export interface CarModel extends Model<TCar> {
  // doesCarExists by _id static method
  isCarExists(id: string): Promise<boolean>;
  // checkCarQuantity by _id static method
  getCarQuantity(id: string): Promise<number>;
  // updateCarQuantity by _id static method
  updateCarQuantity(id: Types.ObjectId, quantityChange: number): Promise<TCar | null>;
}

// checks if a car exists on the database
carSchema.statics.isCarExists = async (id: string): Promise<boolean> => {
  const existingCar = await Car.exists({ _id: id });
  return existingCar ? true : false;
};

// returns the car quantity from database
carSchema.statics.getCarQuantity = async (id: string): Promise<number> => {
  const car = await Car.findById(id);
  return car?.quantity ?? 0;
};

// update the car quantity and set isStock to false if quantity is 0
carSchema.statics.updateCarQuantity = async (id: Types.ObjectId, quantity: number): Promise<TCar | null> => {
  const updatedCar = await Car.findByIdAndUpdate(id, { $inc: { quantity: quantity } }, { new: true });
  if (updatedCar?.quantity === 0) {
    await Car.findByIdAndUpdate(id, { $set: { inStock: false } });
  }
  return updatedCar;
};

// query middleware/hook to remove the deleted field when updating or finding
carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.post('updateOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.post('updateMany', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Car = model<TCar, CarModel>('Car', carSchema);
