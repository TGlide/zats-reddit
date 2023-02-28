import { page } from '$app/stores';
import { Filter } from '$entities/filter';
import { derived } from 'svelte/store';

export const filter = derived(page, ($page) => {
	return $page.params.filter ?? Filter.Best;
});

export const user = derived(page, ($page) => {
	return $page.data.user;
});

export const upvotes = derived(page, ($page) => {
	return $page.data.upvotes;
});

export const downvotes = derived(page, ($page) => {
	return $page.data.downvotes;
});
