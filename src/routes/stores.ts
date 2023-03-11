import { page } from '$app/stores';
import { Filter } from '$entities/filter';
import type { User } from '$entities/user';
import { derived } from 'svelte/store';

export const filter = derived(page, ($page) => {
	return ($page.params.filter ?? Filter.Hot) as Filter;
});

export const user = derived(page, ($page) => {
	return $page.data.user as User;
});

export const upvotes = derived(page, ($page) => {
	return $page.data.upvotes as string[];
});

export const downvotes = derived(page, ($page) => {
	return $page.data.downvotes as string[];
});

export const subreddit = derived(page, ($page) => {
	return $page.params.subreddit;
});
