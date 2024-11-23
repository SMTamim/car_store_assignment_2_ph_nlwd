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
        message: 'You must provide a brand name for the car',
      }),
    })
    .max(50),
  model: z
    .string({
      errorMap: () => ({
        message: 'You must provide a model name for the car',
      }),
    })
    .max(50),
  year: z
    .number()
    .int()
    .refine((value) => value >= 1000 && value <= 9999, {
      message: 'The number must be a valid year (e.g., between 1000 and 9999)',
    }),
  price: z.number().min(0),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: 'Category of the car must be one of the followings "Sedan", "SUV", "Truck", "Coupe", or "Convertible".',
    }),
  }),
  description: z.string().min(1, 'You must provide a description for the car').max(300),
  quantity: z.number().min(0),
  inStock: z.boolean({
    errorMap: () => ({
      message: '"inStock" must be either "true" or "false"',
    }),
  }),
});
