import { Types } from 'mongoose';
import { z } from 'zod';

// validate the car ObjectId using zod
const objectIdSchema = z.string().refine((id) => Types.ObjectId.isValid(id), {
  message: 'Invalid Card Id',
});

// zod validation for order data
export const orderValidationSchema = z.object({
  email: z.string().email(),
  car: objectIdSchema,
  quantity: z.number().int().min(1, { message: '"quantity" must be at least 1' }),
  totalPrice: z.number().min(0, { message: '"totalPrice" must be at least 0' }),
});
