import { createPostHandler } from '$entities/post.server';
import { getUserSession } from '$entities/user.server';
import { getFormDataObj } from '$helpers/form';

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const user = await getUserSession(cookies);
		const data = await getFormDataObj(request);
		const result = createPostHandler.parse({ ...data, authorId: user.uuid, authorName: user.name });

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
