import { getPosts } from '$entities/post.server';

export const load = async ({ params, locals }) => {
	const user = locals.user;
	const posts = await getPosts({ subreddit: params.subreddit, authorId: user.uuid });
	return { posts };
};
