<script lang="ts">
	import type { Post } from '$entities/post';
	import { votes } from '$entities/votes';
	import Icon from '$UI/Icon.svelte';

	export let posts: Post[];
</script>

<ul class="flex flex-col gap-4">
	{#each posts as post, index}
		{@const isUpvoted = $votes.upvoted.includes(post.$id)}
		{@const isDownvoted = $votes.downvoted.includes(post.$id)}
		{@const score = post.upvotes + (isUpvoted ? 1 : 0) - (post.downvotes + (isDownvoted ? 1 : 0))}
		{@const commentsHref = `/r/${post.subreddit}/${post.$id}`}

		<li class="flex items-center gap-4">
			<span class="block w-2 text-lg text-gray-6">
				{index + 1}
			</span>

			<div class="flex w-10 flex-col items-center">
				<button
					class={isUpvoted ? 'text-pink-5' : 'text-gray-5'}
					on:click={() => votes.upvote(post.$id)}
				>
					<Icon name="arrow-up" />
				</button>
				<span class="text-sm font-bold text-gray-8">{score}</span>
				<button
					class={isDownvoted ? 'text-blue-8' : 'text-gray-5'}
					on:click={() => votes.downvote(post.$id)}
				>
					<Icon name="arrow-down" />
				</button>
			</div>

			<div class="grid h-14 w-14 place-items-center rounded-md bg-gray-5/75">
				<svg class="h-8 w-8 text-white">
					<use href="/icons/text.svg#text" />
				</svg>
			</div>

			<div>
				<a class="font-semibold text-blue-8 hover:underline" href={commentsHref}>
					{post.title}
				</a>
				<div class="flex items-center gap-4">
					<a
						class="cursor-pointer text-sm text-gray-9  hover:underline"
						href={`/r/${post.subreddit}`}
					>
						{`r/${post.subreddit}`}
					</a>
					<div class="flex items-center gap-1 text-gray-9">
						<Icon name="messages" size={16} />
						<a class="cursor-pointer text-sm   hover:underline" href={commentsHref}>
							{`${post.comments} ${post.comments === 1 ? 'comment' : 'comments'}`}
						</a>
					</div>
				</div>
			</div>
		</li>
		{#if index < posts.length - 1}
			<hr class="opacity-[15%]" />
		{/if}
	{/each}
</ul>
