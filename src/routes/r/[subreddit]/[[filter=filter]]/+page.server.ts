import { getPosts } from '$entities/post';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getPosts(params.subreddit);
	return { posts };
};
