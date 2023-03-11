import { createPostHandler } from '$entities/post.server';
import { getFormDataObj } from '$helpers/form';

import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const user = locals.user;
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
};
