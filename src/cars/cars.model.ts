import { Model, Schema, model } from 'mongoose';

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
    // toJSON: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform: (doc, ret) => {
    //     delete ret.isDeleted;
    //     return ret;
    //   },
    // },
    // toObject: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform: (doc, ret) => {
    //     delete ret.isDeleted;
    //     return ret;
    //   },
    // },
  },
);

// doesCarExists by _id static method
export interface CarModel extends Model<TCar> {
  isCarExists(id: string): Promise<boolean>;
}

carSchema.statics.isCarExists = async (id: string): Promise<boolean> => {
  const existingCar = await Car.exists({ _id: id });
  return existingCar ? true : false;
};

// query middleware
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
