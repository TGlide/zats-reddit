<script lang="ts">
	import PostThumb from '$components/PostThumb.svelte';
	import { Filter } from '$entities/filter';
	import { postRatio, postScore, type Post } from '$entities/post';
	import { multiSort } from '$helpers/array';
	import { filter } from './stores';

	export let posts: Post[];

	function sortPosts(posts: Post[], filter: Filter) {
		function compareScore(a: Post, b: Post) {
			return postScore(b) - postScore(a);
		}

		function compareDate(a: Post, b: Post) {
			return new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime();
		}

		function compareRatio(a: Post, b: Post) {
			return postRatio(a) - postRatio(b);
		}

		switch (filter) {
			case Filter.Hot:
				return multiSort(posts, [compareScore, compareDate]);
			case Filter.New:
				return posts.sort(compareDate);
			case Filter.Controversial:
				return multiSort(posts, [compareRatio, (a, b) => -compareScore(a, b), compareDate]);
		}
	}

	$: sortedPosts = sortPosts(posts, $filter);
</script>

<ul class="flex flex-col gap-4">
	{#each sortedPosts as post, index (post.$id)}
		<li class="flex items-center gap-4">
			<span class="block w-2 text-lg text-gray-6">
				{index + 1}
			</span>

			<PostThumb {post} />
		</li>
		{#if index < posts.length - 1}
			<hr class="opacity-[15%]" />
		{/if}
	{/each}
</ul>
