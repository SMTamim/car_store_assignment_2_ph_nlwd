import { z } from 'zod';

// zod validation for order data
export const orderValidationSchema = z.object({
  email: z
    .string({ errorMap: () => ({ message: "You must provide an 'email' field" }) })
    .email("field 'email' must be a valid email"),
  car: z.string({ errorMap: () => ({ message: "You must provide a 'car' field" }) }),
  quantity: z
    .number({ errorMap: () => ({ message: "'quantity' must be a number" }) })
    .int()
    .min(1, { message: '"quantity" must be at least 1' }),
  totalPrice: z
    .number({ errorMap: () => ({ message: "'totalPrice' must be a number" }) })
    .min(0, { message: '"totalPrice" must be at least 0' }),
});
