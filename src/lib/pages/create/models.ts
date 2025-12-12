import { z } from 'zod';

export const createFormRequestScheme = z.object({
  name: z
    .string({ error: 'Name must be filled' })
    .min(1, { message: 'Name must be filled' }),
  occasion: z.string().min(1, 'Please select occasion'),
  customMessage: z.string().optional(),
  from: z.string().optional(),
});

export type CreateFormType = z.infer<typeof createFormRequestScheme>;
