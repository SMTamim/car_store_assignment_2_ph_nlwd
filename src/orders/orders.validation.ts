import { z } from 'zod';

// zod validation for order data
export const orderValidationSchema = z.object({
  email: z.string().email(),
  car: z.string(),
  quantity: z
    .number({ errorMap: () => ({ message: "'quantity' must be a number" }) })
    .int()
    .min(1, { message: '"quantity" must be at least 1' }),
  totalPrice: z
    .number({ errorMap: () => ({ message: "'totalPrice' must be a number" }) })
    .min(0, { message: '"totalPrice" must be at least 0' }),
});
