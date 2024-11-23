import { Schema, model } from 'mongoose';

// define Car type
export type TCar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: string;
  inStock: boolean;
};

// defile mongoose schema fro Car type
export const carSchema = new Schema<TCar>({
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
  quantity: { type: String, required: true },
  inStock: { type: Boolean, default: true },
});

export const Car = model('Car', carSchema);
