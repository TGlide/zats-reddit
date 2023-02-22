import { page } from '$app/stores';
import { Filter } from '$entities/filter';
import { derived } from 'svelte/store';

export const filter = derived(page, ($page) => {
	return $page.params.filter ?? Filter.Best;
});
