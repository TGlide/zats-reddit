import { getPosts } from '$entities/post.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();
	const posts = await getPosts({ subreddit: params.subreddit, author: user });
	return { posts };
};
