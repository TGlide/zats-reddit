import { z } from 'zod';
import { documentSchema } from './appwrite';
import type { CommentTree } from './comment';

export const postSchema = documentSchema.extend({
	title: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	subreddit: z.string(),
	authorId: z.string(),
	description: z.string().nullable(),
	restricted: z.boolean().nullable(),
	numComments: z.number().nullable().optional(),
	authorName: z.string().nullable().optional()
});

export type Post = z.infer<typeof postSchema>;
export type ExpandedPost = Post & { commentTree: CommentTree };

export function isPost(obj: unknown): obj is Post {
	return postSchema.safeParse(obj).success;
}

export function postScore(post: Post) {
	return post.upvotes - post.downvotes;
}

export function postRatio(post: Post) {
	return post.upvotes / (post.upvotes + post.downvotes);
}
