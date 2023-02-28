import { z } from 'zod';
import type { CommentTree } from './comment';

export const postSchema = z.object({
	title: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	subreddit: z.string(),
	author: z.string(),
	$createdAt: z.string(),
	$id: z.string(),
	description: z.string().nullable(),
	restricted: z.boolean().nullable()
});

export type Post = z.infer<typeof postSchema> & { comments: number };
export type ExpandedPost = Post & { commentTree: CommentTree };
