import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentsListSchema } from './appwrite';
import { getNumComments } from './comment';

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

export type Post = z.infer<typeof postSchema> & { comments: number };

export const postInputSchema = z.object({
	title: z.string().trim().min(1),
	subreddit: z.string().trim().min(1),
	description: z.string().optional(),
	author: z.string().trim().min(1)
});

export async function getPosts(subreddit?: string) {
	const posts = await databases.listDocuments(
		APPWRITE_DB,
		APPWRITE_COLLECTION_TEXT_POSTS,
		subreddit ? [Query.equal('subreddit', subreddit)] : undefined
	);

	const { documents } = documentsListSchema(postSchema).parse(posts);

	const postsWithNumComments: Post[] = await Promise.all(
		documents.map(async (post) => {
			const numComments = await getNumComments(post.$id);
			return { ...post, comments: numComments };
		})
	);

	return postsWithNumComments;
}
