import { model, ObjectId, Schema, Types } from 'mongoose';

// define Order type
export type TOrder = {
  email: string;
  car: ObjectId;
  quantity: number;
  totalPrice: number;
};

// define mongoose schema for Order type
export const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  car: { type: Types.ObjectId, ref: 'Car', required: true }, // references Car model
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const Order = model('Order', orderSchema);
