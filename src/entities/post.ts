import { z } from 'zod';

export const postSchema = z.object({
	title: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	subreddit: z.string(),
	author: z.string().optional().nullable(),
	$createdAt: z.string()
});

export type Post = z.infer<typeof postSchema>;
