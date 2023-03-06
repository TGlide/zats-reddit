import { z } from 'zod';
import { documentSchema } from './appwrite';
import type { CommentTree } from './comment';

export const postSchema = documentSchema.extend({
	title: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	subreddit: z.string(),
	author: z.string(),
	description: z.string().nullable(),
	restricted: z.boolean().nullable()
});

export type Post = z.infer<typeof postSchema> & { numComments: number };
export type ExpandedPost = Post & { commentTree: CommentTree };

export function isPost(obj: unknown): obj is Post {
	return postSchema.safeParse(obj).success;
}
