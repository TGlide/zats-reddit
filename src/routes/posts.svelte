<script lang="ts">
	import PostThumb from '$components/PostThumb.svelte';
	import type { Post } from '$entities/post';

	export let posts: Post[];
</script>

<ul class="flex flex-col gap-4">
	{#each posts as post, index}
		<li class="flex items-center gap-4">
			<span class="block w-2 text-lg text-gray-6">
				{index + 1}
			</span>

			<PostThumb {post} />
		</li>
		{#if index < posts.length - 1}
			<hr class="opacity-[15%]" />
		{/if}
	{/each}
</ul>
