import { z } from 'zod';

export const createGymSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email address'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be at least 3 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters').optional(),
  address: z.string().min(3, 'Address must be at least 3 characters').optional(),
  logo_url: z.string().optional(),
});

export type CreateGymDto = z.infer<typeof createGymSchema>;
