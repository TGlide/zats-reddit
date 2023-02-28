import { createPostHandler } from '$entities/post.server';
import { getFormDataObj } from '$helpers/form';
import { getSession } from '$lib/session.server';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const user = getSession(cookies);
		const data = await getFormDataObj(request);
		const result = createPostHandler.parse({ ...data, author: user });

		if (result.success) {
			const post = await result.execute();
			throw redirect(303, `/r/${post.subreddit}/${post.$id}`);
		} else {
			return {
				errors: result.error.flatten()
			};
		}
	}
} satisfies Actions;
