<script lang="ts">
	import type { Post } from '$entities/post';
	import { toggle } from '$helpers/array';
	import Icon from '$UI/Icon.svelte';

	export let posts: Post[];

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
	{#each posts as post, index}
		{@const isUpvoted = upvoted.includes(index)}
		{@const isDownvoted = downvoted.includes(index)}
		{@const score = post.upvotes + (isUpvoted ? 1 : 0) - (post.downvotes + (isDownvoted ? 1 : 0))}

		<li class="flex items-center gap-4">
			<span class="block w-2 text-lg text-gray-6">
				{index + 1}
			</span>

			<div class="flex w-10 flex-col items-center">
				<button class={isUpvoted ? 'text-pink-5' : 'text-gray-5'} on:click={upvote(index)}>
					<Icon name="arrow-up" />
				</button>
				<span class="text-sm font-bold text-gray-8">{score}</span>
				<button class={isDownvoted ? 'text-blue-8' : 'text-gray-5'} on:click={downvote(index)}>
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
				<a
					class="cursor-pointer text-sm text-gray-9  hover:underline"
					href={`/r/${post.subreddit}`}
				>
					{`r/${post.subreddit}`}
				</a>
			</div>
		</li>
	{/each}
</ul>
