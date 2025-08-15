import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
}).strict();

export type ISignInDTO = z.infer<typeof signInSchema>;

