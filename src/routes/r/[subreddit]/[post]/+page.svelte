<script lang="ts">
	import Comment from '$components/Comment.svelte';
	import PostThumb from '$components/PostThumb.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
</script>

<PostThumb {post} />
{#if post.description}
	<p class="mt-4 rounded-md border border-solid border-blue-7 py-1 px-2">
		{post.description}
	</p>
{/if}

<form class="mt-8 flex flex-col items-start" method="post" action="?/reply">
	<input type="hidden" name="postId" value={post.$id} />
	<textarea
		name="text"
		class="h-24 w-full rounded-md border border-solid border-gray-5/50 px-2 py-1 lg:w-1/2"
		placeholder="Add a comment..."
	/>
	<button class="btn mt-2">Comment</button>
</form>

<div class="mt-8 flex flex-col gap-4">
	{#if post.commentTree.length === 0}
		<p class="text-gray-9">No comments yet</p>
	{/if}
	{#each post.commentTree as comment}
		<Comment {comment} postId={post.$id} />
	{/each}
</div>
