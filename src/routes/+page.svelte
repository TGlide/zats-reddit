<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid min-h-screen place-items-center bg-black text-white">
	<div class="grid max-w-lg gap-2 break-all">
		<h1 class="text-5xl font-thin">ZATS Reddit</h1>
		<p class="mt-4 text-lg">Posts:</p>
		<ul>
			{#each data.posts as post}
				<li>{JSON.stringify(post)}</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	h1 {
		color: var(--tw-colors-pink-200);
		font-size: var(--tw-font-size-5xl);
		font-weight: var(--tw-font-weight-thin);
	}
</style>
