import { z } from 'zod';

export const postSchema = z.object({
	title: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	subreddit: z.string(),
	author: z.string(),
	$createdAt: z.string(),
	$id: z.string(),
	description: z.string().nullable()
});

export type Post = z.infer<typeof postSchema>;

export const postInputSchema = z.object({
	title: z.string().trim().min(1),
	subreddit: z.string().trim().min(1),
	description: z.string().optional(),
	author: z.string().trim().min(1)
});
