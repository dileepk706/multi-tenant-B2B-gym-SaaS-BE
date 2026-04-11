import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  gym_url: z.string().min(3, 'Gym URL must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  address: z.string().min(3, 'Address must be at least 3 characters').optional(),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
