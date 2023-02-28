import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const upvotes = derived(page, ($page) => {
	return $page.data.upvotes;
});

export const downvotes = derived(page, ($page) => {
	return $page.data.downvotes;
});
