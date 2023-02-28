<script lang="ts">
	import type { CommentTreeItem } from '$entities/comment';
	import { user } from '$routes/stores';
	import Icon from '$UI/Icon.svelte';

	export let comment: CommentTreeItem;
	export let postId: string;

	const score = comment.upvotes - comment.downvotes;
	let expanded = true;

	let replying = false;
</script>

<div class="rounded-sm border border-solid border-gray-4 px-2 py-1 text-sm">
	<div class="flex items-center gap-2">
		<button class="text-blue-8" on:click={() => (expanded = !expanded)}
			>[{expanded ? '-' : '+'}]</button
		>
		<span class="font-semibold">{comment.author}</span>
	</div>
	<div class:hidden={!expanded}>
		<p>
			{comment.text}
		</p>
		<div class="actions mt-2 flex items-center gap-2 text-sm">
			<button>
				<Icon name="arrow-up" size={14} />
			</button>
			<span>{score}</span>
			<button>
				<Icon name="arrow-down" size={14} />
			</button>
			<button on:click={() => (replying = !replying)}>reply</button>
			{#if comment.author === $user}
				<form method="post" action="?/delete">
					<input type="hidden" name="id" value={comment.$id} />
					<button>delete</button>
				</form>
			{/if}
		</div>
		{#if replying}
			<form class="mt-2 flex flex-col items-start" method="post" action="?/reply">
				<input type="hidden" name="postId" value={postId} />
				<input type="hidden" name="parentCommentId" value={comment.$id} />
				<textarea
					name="text"
					class="h-24 w-1/2 rounded-md border border-solid border-gray-5/50 px-2 py-1"
					placeholder="Add a comment..."
				/>
				<div class="mt-2 flex gap-2">
					<button class="btn" type="submit">Comment</button>
					<button class="btn-outline" on:click|preventDefault={() => (replying = false)}>
						Cancel
					</button>
				</div>
			</form>
		{/if}
		{#each comment?.children ?? [] as child}
			<div class="py-2">
				<svelte:self comment={child} {postId} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.actions * {
		color: theme('colors.gray.8');

		&:is(button):hover {
			color: theme('colors.gray.12');
		}
	}
</style>
