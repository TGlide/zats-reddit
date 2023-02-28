import { voteHandler } from '$entities/vote.server';
import { getFormDataObj } from '$helpers/form';
import { getSession } from '$lib/session.server';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request, cookies }) {
		const user = getSession(cookies);
		const data = await getFormDataObj(request);
		const result = voteHandler.parse({ ...data, author: user });

		if (result.success) {
			await result.execute();
			throw redirect(303, result.data.redirectTo);
		} else {
			throw error(500, 'Invalid input');
		}
	}
};
