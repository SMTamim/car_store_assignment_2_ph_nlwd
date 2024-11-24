import { z } from 'zod';

// car update data validation using zod
export const carUpdateSchema = z.object({
  price: z.number().min(0),
  quantity: z.number().min(0),
});

// car data validation using zod
export const carValidationSchema = z.object({
  brand: z
    .string({
      errorMap: () => ({
        message: "You must provide a string 'brand' name for the car",
      }),
    })
    .max(50),
  model: z
    .string({
      errorMap: () => ({
        message: "You must provide a string 'model' name for the car",
      }),
    })
    .max(50),
  year: z
    .number()
    .int()
    .refine((value) => value >= 1000 && value <= 9999, {
      message: "The number must be a valid 'year' (e.g., between 1000 and 9999)",
    }),
  price: z
    .number({ errorMap: () => ({ message: "'price' must be a number" }) })
    .min(0, "'price' must be greater than -1"),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: `Category of the car must be one of the followings 'Sedan', 'SUV', 'Truck', 'Coupe', or 'Convertible'.`,
    }),
  }),
  description: z
    .string({ errorMap: () => ({ message: "You must provide a string 'description' for the car" }) })
    .max(300, "'description' can be max 300 characters."),
  quantity: z
    .number({ errorMap: () => ({ message: "'quantity' must be a number" }) })
    .min(0, "'quantity' must be greater than -1"),
  inStock: z.boolean({
    errorMap: () => ({
      message: `'inStock' must be either 'true' or 'false'`,
    }),
  }),
});
