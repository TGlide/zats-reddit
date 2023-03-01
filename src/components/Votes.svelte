<script lang="ts">
	import { page } from '$app/stores';
	import type { CommentTreeItem } from '$entities/comment';
	import { isPost as isPostFn, type Post } from '$entities/post';
	import { debounced } from '$helpers/debounce';
	import { downvotes, upvotes } from '$routes/stores';
	import Icon from '$UI/Icon.svelte';

	export let entry: Post | CommentTreeItem;
	$: isPost = isPostFn(entry);

	function getUserVote() {
		if ($upvotes.includes(entry.$id)) {
			return 1;
		} else if ($downvotes.includes(entry.$id)) {
			return -1;
		} else {
			return 0;
		}
	}
	const initialVote = getUserVote();
	let userVote = initialVote;
	$: isUpvoted = userVote === 1;
	$: isDownvoted = userVote === -1;
	$: score = entry.upvotes - entry.downvotes + (userVote - initialVote);

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

<form
	class:post={isPost}
	class:comment={!isPost}
	method="post"
	action="/vote?/upvote"
	bind:this={voteForm}
>
	<input type="hidden" name="parentId" value={entry.$id} />
	<input type="hidden" name="parentType" value={isPost ? 'POST' : 'COMMENT'} />
	<input type="hidden" name="redirectTo" value={$page.url.href} />

	<!-- 
			The formaction is reversed here, because it is only used when JS is not available.
			Same for the downvote button below.
		 -->
	<button
		formaction={isUpvoted ? '/vote?/nonevote' : '/vote?/upvote'}
		data-upvoted={isUpvoted}
		on:click|preventDefault={upvote}
	>
		<Icon name="arrow-up" size={isPost ? 24 : 14} />
	</button>
	<span class="score">{score}</span>
	<button
		formaction={isDownvoted ? '/vote?/nonevote' : '/vote?/downvote'}
		data-downvoted={isDownvoted}
		on:click|preventDefault={downvote}
	>
		<Icon name="arrow-down" size={isPost ? 24 : 14} />
	</button>
</form>

<style lang="postcss">
	.post {
		@apply flex w-10 flex-col items-center;

		.score {
			@apply text-sm font-bold text-gray-8;
		}

		button {
			@apply text-gray-5;

			&:hover {
				@apply text-gray-7;
			}
		}
	}

	.comment {
		@apply flex items-center gap-2 text-sm;

		.score {
			@apply w-4 text-center;
		}

		button {
			@apply text-gray-7;

			&:hover {
				@apply text-gray-9;
			}
		}
	}

	button[data-upvoted='true'] {
		@apply text-pink-5;
	}

	button[data-downvoted='true'] {
		@apply text-blue-8;
	}
</style>
