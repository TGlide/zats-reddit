import { getVotes } from '$entities/vote';
import { getSession } from '$lib/session.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = getSession(cookies);

	const votes = await getVotes({ author: user });
	const upvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'UP' ? [...acc, vote.postId] : acc;
	}, [] as string[]);
	const downvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'DOWN' ? [...acc, vote.postId] : acc;
	}, [] as string[]);

	return { user, upvotes, downvotes };
};
