import { getPost } from '$entities/post.server';
import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { getSession } from '$lib/session.server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
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
		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData.entries());

		const commentInputSchema = z.object({
			text: z.string().trim().min(1),
			postId: z.string(),
			parentCommentId: z.string().optional()
		});

		const result = commentInputSchema.safeParse(formDataObj);

		if (result.success) {
			const comment = await databases.createDocument(
				APPWRITE_DB,
				APPWRITE_COLLECTION_COMMENTS,
				'unique()',
				{
					...result.data,
					restricted: true,
					author: user
				}
			);

			return comment;
		} else {
			return {
				errors: result.error.flatten()
			};
		}
	},
	async delete({ request, cookies }) {
		const user = getSession(cookies);
		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData.entries());

		const commentDeleteSchema = z.object({
			id: z.string()
		});

		const result = commentDeleteSchema.safeParse(formDataObj);

		if (result.success) {
			await databases.deleteDocument(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, result.data.id);
		} else {
			throw error(400, 'Bad request');
		}
	}
};
