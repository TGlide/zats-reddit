<script lang="ts">
	import Comment from '$components/Comment.svelte';
	import { votes } from '$entities/votes';
	import Icon from '$UI/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;

	const isUpvoted = $votes.upvoted.includes(post.$id);
	const isDownvoted = $votes.downvoted.includes(post.$id);
	const score = post.upvotes + (isUpvoted ? 1 : 0) - (post.downvotes + (isDownvoted ? 1 : 0));
	const commentsHref = `/r/${post.subreddit}/${post.$id}`;
</script>

<div class="flex items-center gap-4">
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

		<div class="flex items-center gap-3 text-sm text-gray-9 ">
			<a class="cursor-pointer hover:underline" href={`/r/${post.subreddit}`}>
				{`r/${post.subreddit}`}
			</a>

			<div class="flex items-center gap-1 ">
				<Icon name="messages" size={16} />
				<a class="cursor-pointer hover:underline" href={commentsHref}>
					{`${post.comments} ${post.comments === 1 ? 'comment' : 'comments'}`}
				</a>
			</div>

			<span class="">by {post.author}</span>
		</div>
	</div>
</div>
{#if post.description}
	<p class="mt-4 rounded-md border border-solid border-blue-7 py-1 px-2">
		{post.description}
	</p>
{/if}

<form class="mt-8 flex flex-col items-start" method="post" action="?/reply">
	<input type="hidden" name="postId" value={post.$id} />
	<textarea
		name="text"
		class="h-24 w-1/2 rounded-md border border-solid border-gray-5/50 px-2 py-1"
		placeholder="Add a comment..."
	/>
	<button class="btn mt-2 text-white">Comment</button>
</form>

<div class="mt-8 flex flex-col gap-2">
	{#if post.commentTree.length === 0}
		<p class="text-gray-9">No comments yet</p>
	{/if}
	{#each post.commentTree as comment}
		<Comment {comment} postId={post.$id} />
	{/each}
</div>
