import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { getSession } from '$lib/session.server';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const user = getSession(cookies);
		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData.entries());

		const postInputSchema = z.object({
			title: z.string().trim().min(1),
			subreddit: z.string().trim().min(1),
			description: z.string().optional()
		});

		const result = postInputSchema.safeParse(formDataObj);

		if (result.success) {
			const post = await databases.createDocument(
				APPWRITE_DB,
				APPWRITE_COLLECTION_TEXT_POSTS,
				'unique()',
				{
					...result.data,
					restricted: true,
					author: user
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
