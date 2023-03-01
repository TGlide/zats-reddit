<script lang="ts">
	import { page } from '$app/stores';
	import type { Post } from '$entities/post';
	import { debounced } from '$helpers/debounce';
	import { downvotes, upvotes } from '$routes/stores';
	import Icon from '$UI/Icon.svelte';

	export let post: Post;

	function getUserVote() {
		if ($upvotes.includes(post.$id)) {
			return 1;
		} else if ($downvotes.includes(post.$id)) {
			return -1;
		} else {
			return 0;
		}
	}
	const initialVote = getUserVote();
	let userVote = initialVote;
	$: isUpvoted = userVote === 1;
	$: isDownvoted = userVote === -1;
	$: score = post.upvotes - post.downvotes + (userVote - initialVote);

	const commentsHref = `/r/${post.subreddit}/${post.$id}`;

	let voteForm: HTMLFormElement;
	const vote = debounced(async (voteType: 'up' | 'down' | 'none') => {
		const data = new FormData(voteForm);

		await fetch(`/vote?/${voteType}vote`, {
			method: 'POST',
			body: data
		});
	}, 500);

	function upvote() {
		if (isUpvoted) {
			userVote = 0;
			vote('none');
		} else {
			userVote = 1;
			vote('up');
		}
	}

	function downvote() {
		if (isDownvoted) {
			userVote = 0;
			vote('none');
		} else {
			userVote = -1;
			vote('down');
		}
	}
</script>

<div class="flex items-center gap-4">
	<form
		class="flex w-10 flex-col items-center"
		method="post"
		action="/vote?/upvote"
		bind:this={voteForm}
	>
		<input type="hidden" name="postId" value={post.$id} />
		<input type="hidden" name="redirectTo" value={$page.url.href} />

		<!-- 
			The formaction is reversed here, because it is only used when JS is not available.
			Same for the downvote button below.
		 -->
		<button
			formaction={isUpvoted ? '/vote?/nonevote' : '/vote?/upvote'}
			class={isUpvoted ? 'text-pink-5' : 'text-gray-5'}
			on:click|preventDefault={upvote}
		>
			<Icon name="arrow-up" />
		</button>
		<span class="text-sm font-bold text-gray-8">{score}</span>
		<button
			formaction={isDownvoted ? '/vote?/nonevote' : '/vote?/downvote'}
			class={isDownvoted ? 'text-blue-8' : 'text-gray-5'}
			on:click|preventDefault={downvote}
		>
			<Icon name="arrow-down" />
		</button>
	</form>

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
