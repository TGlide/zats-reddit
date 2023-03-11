import { z } from 'zod';

export const voteSchema = z.object({
	parentId: z.string().trim().min(1),
	direction: z.enum(['UP', 'DOWN', 'NONE']),
	authorId: z.string().trim().min(1),
	parentType: z.enum(['POST', 'COMMENT'])
});

export type Vote = z.infer<typeof voteSchema>;
