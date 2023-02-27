import { getSession } from '$lib/session.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = getSession(cookies);
	return { user };
};
