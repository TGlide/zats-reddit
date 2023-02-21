<script lang="ts">
	import { toggle } from '$helpers/array';
	import Icon from '$UI/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let upvoted: number[] = [];
	let downvoted: number[] = [];

	function upvote(index: number) {
		return () => {
			upvoted = toggle(index, upvoted);
			downvoted = downvoted.filter((i) => i !== index);
		};
	}

	function downvote(index: number) {
		return () => {
			downvoted = toggle(index, downvoted);
			upvoted = upvoted.filter((i) => i !== index);
		};
	}
</script>

<ul class="mt-4 flex flex-col gap-4 pl-4">
	{#each data.posts as post, index}
		{@const isUpvoted = upvoted.includes(index)}
		{@const isDownvoted = downvoted.includes(index)}
		{@const score = post.upvotes + (isUpvoted ? 1 : 0) - (post.downvotes + (isDownvoted ? 1 : 0))}

		<li class="flex items-center gap-4">
			<span class="block w-2 text-lg text-gray-6">
				{index + 1}
			</span>

			<div class="flex w-10 flex-col items-center">
				<button class="text-gray-5" class:text-pink-5={isUpvoted} on:click={upvote(index)}>
					<Icon name="arrow-up" />
				</button>
				<span class="text-sm font-bold text-gray-8">{score}</span>
				<button class="text-gray-5" class:text-blue-8={isDownvoted} on:click={downvote(index)}>
					<Icon name="arrow-down" />
				</button>
			</div>

			<div class="grid h-14 w-14 place-items-center rounded-md bg-gray-5/75">
				<svg class="h-8 w-8 text-white">
					<use href="/icons/text.svg#text" />
				</svg>
			</div>

			<div>
				<h2 class="font-semibold">
					{post.title}
				</h2>
				<span class="text-sm">{`r/${post.subreddit}`}</span>
			</div>
		</li>
	{/each}
</ul>
