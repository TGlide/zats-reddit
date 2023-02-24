import { getPost } from '$entities/post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getPost(params.post);
		return { post };
	} catch (e) {
		console.error(e);
		throw error(404, 'Post not found');
	}
};
