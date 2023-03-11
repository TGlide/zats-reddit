import { z } from 'zod';

export const userSchema = z.object({
	name: z.string(),
	uuid: z.string().uuid()
});

export type User = z.infer<typeof userSchema>;
