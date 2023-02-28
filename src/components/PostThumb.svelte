<script lang="ts">
	import { page } from '$app/stores';
	import type { Post } from '$entities/post';
	import { downvotes, upvotes } from '$routes/stores';
	import Icon from '$UI/Icon.svelte';

	export let post: Post;

	const isUpvoted = $upvotes.includes(post.$id);
	const isDownvoted = $downvotes.includes(post.$id);
	const score = post.upvotes - post.downvotes;
	const commentsHref = `/r/${post.subreddit}/${post.$id}`;
</script>

<div class="flex items-center gap-4">
	<div class="flex w-10 flex-col items-center">
		<form method="post" action="/vote?">
			<input type="hidden" name="postId" value={post.$id} />
			<input type="hidden" name="direction" value="UP" />
			<input type="hidden" name="redirectTo" value={$page.url.href} />
			<button class={isUpvoted ? 'text-pink-5' : 'text-gray-5'}>
				<Icon name="arrow-up" />
			</button>
		</form>
		<span class="text-sm font-bold text-gray-8">{score}</span>
		<form method="post" action="/vote?">
			<input type="hidden" name="postId" value={post.$id} />
			<input type="hidden" name="direction" value="DOWN" />
			<input type="hidden" name="redirectTo" value={$page.url.href} />
			<button class={isDownvoted ? 'text-blue-8' : 'text-gray-5'}>
				<Icon name="arrow-down" />
			</button>
		</form>
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
			<a class="cursor-pointer text-sm text-gray-9  hover:underline" href={`/r/${post.subreddit}`}>
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
</div>
