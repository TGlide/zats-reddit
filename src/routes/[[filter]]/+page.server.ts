import { APPWRITE_COLLECTION_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const postsSchema = z.object({
	documents: z.array(
		z.object({
			title: z.string(),
			upvotes: z.number(),
			downvotes: z.number(),
			subreddit: z.string(),
			author: z.string().optional()
		})
	)
});

export const load: PageServerLoad = async () => {
	const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_POSTS);

	try {
		const { documents } = postsSchema.parse(posts);

		return {
			posts: documents
		};
	} catch {
		return {
			posts: []
		};
	}
};
