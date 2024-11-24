import { model, Schema, Types } from 'mongoose';

// define Order type
export type TOrder = {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// define mongoose schema for Order type
export const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true }, // references Car model
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Order = model('Order', orderSchema);
