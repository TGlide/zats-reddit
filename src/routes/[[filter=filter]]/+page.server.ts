import { getPosts } from '$entities/post.server';

export const load = async ({ locals }) => {
	const user = locals.user;
	const posts = await getPosts({ authorId: user.uuid });
	return { posts };
};
