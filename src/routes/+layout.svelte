<script lang="ts">
	import { page } from '$app/stores';
	import '$styles/index.css';

	const paths = [
		{ path: '/', name: 'best' },
		{ path: '/hot', name: 'hot' },
		{ path: '/new', name: 'new' },
		{ path: '/rising', name: 'rising' },
		{ path: '/controversial', name: 'controversial' },
		{ path: '/top', name: 'top' }
	];
</script>

<svelte:head>
	<link rel="preload" href="/logo.webp" as="image" />
</svelte:head>

<nav class="flex border border-solid border-b-blue-5 bg-blue-1">
	<a href="/">
		<img src="/logo.webp" alt="reddit logo" width="118.44" height="49" class="p-1" />
	</a>
	<ul class="ml-4 -mb-px flex items-end gap-2 ">
		{#each paths as path}
			<li data-active={$page.url.pathname === path.path}>
				<a href={path.path}>{path.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<slot />

<style lang="postcss">
	ul > li {
		background-color: var(--exported-colors-white);
		border: 1px solid transparent;
		border-bottom-color: var(--exported-colors-blue-5);
		border-radius: 4px 4px 0 0;
		color: var(--exported-colors-blue-8);
		font-size: var(--exported-font-size-sm);
		font-weight: var(--exported-font-weight-bold);
		padding-inline: var(--exported-spacing-2);

		&[data-active='true'] {
			border-color: var(--exported-colors-blue-5);
			border-bottom-color: var(--exported-colors-white);
			background-color: var(--exported-colors-white);
			color: var(--exported-colors-pink-5);
		}
	}
</style>
