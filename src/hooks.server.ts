import { getUserSession } from '$entities/user.server';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	event.locals.user = await getUserSession(event.cookies);
	return await resolve(event);
}) satisfies Handle;
