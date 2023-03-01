<script lang="ts">
	import type { CommentTreeItem } from '$entities/comment';
	import Votes from './Votes.svelte';

	export let comment: CommentTreeItem;
	export let postId: string;

	let expanded = true;
	let replying = false;
</script>

<div class={`border-l border-solid border-gray-4 pl-2 text-sm `}>
	<div class="flex items-center gap-2">
		<button class="text-blue-8" on:click={() => (expanded = !expanded)}>
			[<span class="inline-block w-3 text-center">
				{expanded ? '-' : '+'}
			</span>]
		</button>
		<span class="font-semibold text-gray-11">{comment.author}</span>
	</div>
	<div class:hidden={!expanded}>
		<p>
			{comment.text}
		</p>
		<div class="actions mt-2 flex items-center gap-2 text-sm">
			<Votes entry={comment} />

			<button on:click={() => (replying = !replying)}>reply</button>
			<!-- TODO: Add when delete function is done -->
			<!-- {#if comment.author === $user}
				<form method="post" action="?/delete">
					<input type="hidden" name="id" value={comment.$id} />
					<button>delete</button>
				</form>
			{/if} -->
		</div>
		{#if replying}
			<form class="mt-2 flex w-full flex-col  items-start lg:w-1/2" method="post" action="?/reply">
				<input type="hidden" name="postId" value={postId} />
				<input type="hidden" name="parentCommentId" value={comment.$id} />
				<textarea
					name="text"
					class="h-24 w-full rounded-md border border-solid border-gray-5/50 px-2 py-1"
					placeholder="Add a comment..."
				/>
				<div class="mt-2 grid w-full grid-cols-12 gap-2 lg:block lg:w-auto">
					<button
						class="btn is-outline is-small col-span-3"
						on:click|preventDefault={() => (replying = false)}
					>
						Cancel
					</button>
					<button class="btn is-small col-span-9" type="submit">Comment</button>
				</div>
			</form>
		{/if}
		{#each comment?.children ?? [] as child}
			<div class="pl-1 pt-2 ">
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
