import { postSchema } from '$entities/post';
import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const appwritePostsSchema = z.object({
	documents: z.array(postSchema)
});

export const load: PageServerLoad = async () => {
	const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS);

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
