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
		<img src="/logo.webp" alt="logo" width="118.44" height="49" class="p-1" />
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
		background-color: theme(colors.white);
		border: 1px solid transparent;
		border-bottom-color: theme(colors.blue.5);
		border-radius: 4px 4px 0 0;
		color: theme(colors.blue.8);

		font-size: theme(fontSize.sm);
		font-weight: theme(fontWeight.bold);

		padding-inline: theme(spacing.2);

		&[data-active='true'] {
			border-color: theme(colors.blue.5);
			border-bottom-color: theme(colors.white);
			background-color: theme(colors.white);
			color: theme(colors.pink.5);
		}
	}
</style>
