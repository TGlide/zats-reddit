import { voteHandler } from '$entities/vote.server';
import { getFormDataObj } from '$helpers/form';

import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Action } from '@sveltejs/kit';
import { getUserSession } from '$entities/user.server';

function createVoteAction(direction: 'UP' | 'DOWN' | 'NONE') {
	return (async ({ request, cookies }) => {
		const user = await getUserSession(cookies);
		const data = await getFormDataObj(request);
		const result = voteHandler.parse({ ...data, authorId: user.uuid, direction });

		if (result.success) {
			await result.execute();
			throw redirect(303, result.data.redirectTo);
		} else {
			console.error(result.error);
			throw error(500, 'Invalid input');
		}
	}) satisfies Action;
}

export const actions: Actions = {
	upvote: createVoteAction('UP'),
	downvote: createVoteAction('DOWN'),
	nonevote: createVoteAction('NONE')
};
