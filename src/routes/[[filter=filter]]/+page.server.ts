import { getPosts } from '$entities/post.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const posts = await getPosts({ authorId: user.uuid });
	return { posts };
};
