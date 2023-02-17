import { APPWRITE_COLLECTION_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_POSTS);

	return {
		posts: posts.documents
	};
};
