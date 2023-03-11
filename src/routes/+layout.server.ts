import { getVotes } from '$entities/vote.server';

export const load = async ({ locals }) => {
	const user = locals.user;

	const votes = await getVotes({ authorId: user.uuid });
	const upvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'UP' ? [...acc, vote.parentId] : acc;
	}, [] as string[]);
	const downvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'DOWN' ? [...acc, vote.parentId] : acc;
	}, [] as string[]);

	return { user, upvotes, downvotes };
};
