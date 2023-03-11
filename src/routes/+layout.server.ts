import { getUserSession } from '$entities/user.server';
import { getVotes } from '$entities/vote.server';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = await getUserSession(cookies);

	const votes = await getVotes({ authorId: user.uuid });
	const upvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'UP' ? [...acc, vote.parentId] : acc;
	}, [] as string[]);
	const downvotes = votes.reduce((acc, vote) => {
		return vote.direction === 'DOWN' ? [...acc, vote.parentId] : acc;
	}, [] as string[]);

	return { user, upvotes, downvotes };
};
