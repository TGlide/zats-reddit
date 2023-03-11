import { createCommentHandler, deleteCommentHandler } from '$entities/comment.server';
import { getPost } from '$entities/post.server';
import { getFormDataObj } from '$helpers/form';

import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const user = locals.user;

	try {
		const post = await getPost({ postId: params.post, authorId: user.uuid });
		return { post };
	} catch (e) {
		console.error(e);
		throw error(404, 'Post not found');
	}
};

export const actions = {
	async reply({ request, locals }) {
		const user = locals.user;
		const data = await getFormDataObj(request);
		const result = createCommentHandler.parse({
			...data,
			authorId: user.uuid,
			authorName: user.name
		});

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
