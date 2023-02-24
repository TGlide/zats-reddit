import { postInputSchema } from '$entities/post';
import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData.entries());

		const result = postInputSchema.safeParse(formDataObj);

		if (result.success) {
			const post = await databases.createDocument(
				APPWRITE_DB,
				APPWRITE_COLLECTION_TEXT_POSTS,
				'unique()',
				{
					...result.data
				}
			);

			throw redirect(303, `/r/${post.subreddit}/${post.$id}`);
		} else {
			return {
				errors: result.error.flatten()
			};
		}
	}
} satisfies Actions;
