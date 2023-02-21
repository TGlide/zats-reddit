import { postSchema } from '$entities/post';
import { APPWRITE_COLLECTION_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const appwritePostsSchema = z.object({
	documents: z.array(postSchema)
});

export const load: PageServerLoad = async ({ params }) => {
	const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_POSTS, [
		Query.equal('subreddit', params.subreddit)
	]);

	try {
		const { documents } = appwritePostsSchema.parse(posts);

		return {
			posts: documents
		};
	} catch (e) {
		return {
			posts: []
		};
	}
};
