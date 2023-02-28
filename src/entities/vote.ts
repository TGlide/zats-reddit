import { z } from 'zod';

export const voteSchema = z.object({
	postId: z.string().trim().min(1),
	author: z.string().trim().min(1),
	direction: z.enum(['UP', 'DOWN'])
});

export type Vote = z.infer<typeof voteSchema>;
