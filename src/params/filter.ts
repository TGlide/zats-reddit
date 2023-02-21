import { isFilter } from '$entities/filter';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return isFilter(param);
}) satisfies ParamMatcher;
