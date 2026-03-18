import { z } from 'zod';

export const loginUserSchema = z.object({
  //   email: z.email('Invalid email address'),
  //   password: z.string().min(1, 'Password is required'),
  email: z.string(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
