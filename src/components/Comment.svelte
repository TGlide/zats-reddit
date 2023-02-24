<script lang="ts">
	import type { CommentTreeItem } from '$entities/comment';
	import Icon from '$UI/Icon.svelte';

	export let comment: CommentTreeItem;

	const score = comment.upvotes - comment.downvotes;
	let expanded = true;
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
				<!-- <button class="rounded-full bg-gray-2 py-1 px-2 text-gray-10 hover:bg-gray-3  active:bg-gray-2"> -->
				<Icon name="arrow-up" size={14} />
			</button>
			<span>{score}</span>
			<button>
				<Icon name="arrow-down" size={14} />
			</button>
			<button>reply</button>
		</div>
		{#each comment?.children ?? [] as child}
			<div class="py-2">
				<svelte:self comment={child} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.actions > * {
		color: theme('colors.gray.8');

		&:is(button):hover {
			color: theme('colors.gray.12');
		}
	}
</style>
