import { createCommentHandler, deleteCommentHandler } from '$entities/comment.server';
import { getPost } from '$entities/post.server';
import { getFormDataObj } from '$helpers/form';
import { getSession } from '$lib/session.server';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();

	try {
		const post = await getPost({ postId: params.post, author: user });
		return { post };
	} catch (e) {
		console.error(e);
		throw error(404, 'Post not found');
	}
};

export const actions: Actions = {
	async reply({ request, cookies }) {
		const user = getSession(cookies);
		const data = await getFormDataObj(request);
		const result = createCommentHandler.parse({ ...data, author: user });

		if (result.success) {
			const comment = await result.execute();
			return comment;
		} else {
			return {
				errors: result.error.flatten()
			};
		}
	},
	async delete({ request }) {
		const data = await getFormDataObj(request);
		const result = deleteCommentHandler.parse(data);

		if (result.success) {
			await result.execute();
		} else {
			throw error(400, 'Bad request');
		}
	}
};
