<script lang="ts">
	import { page } from '$app/stores';
	import { Filter } from '$entities/filter';
	import '$styles/index.css';
	import { filter } from './filter';

	function getHref(path: string, subreddit?: string) {
		return subreddit ? `/r/${subreddit}${path}` : path;
	}

	$: subreddit = $page.params.subreddit;

	type Path = {
		href: string;
		name: Filter;
	};

	$: paths = [
		{ href: getHref('/', subreddit), name: Filter.Best },
		{ href: getHref('/hot', subreddit), name: Filter.Hot },
		{ href: getHref('/new', subreddit), name: Filter.New },
		{ href: getHref('/rising', subreddit), name: Filter.Rising },
		{ href: getHref('/controversial', subreddit), name: Filter.Controversial },
		{ href: getHref('/top', subreddit), name: Filter.Top }
	] satisfies Path[];

	$: isCreatePage = $page.url.pathname === '/create';
</script>

<svelte:head>
	<link rel="preload" href="/logo.webp" as="image" />
</svelte:head>

<nav class="flex items-end gap-4 border-b border-solid border-b-blue-5 bg-blue-1">
	<a href="/">
		<img src="/logo.webp" alt="logo" width="118.44" height="49" class="p-1" />
	</a>

	{#if subreddit}
		<a class=" text-lg font-light hover:underline" href={`/r/${subreddit}`}>r/{subreddit}</a>
	{/if}

	{#if !isCreatePage}
		<ul class="-mb-px flex items-end gap-2">
			{#each paths as path}
				<li data-active={$filter === path.name}>
					<a href={path.href}>{path.name}</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

<div class="grid grid-cols-12 p-4">
	<div class={isCreatePage ? 'col-span-12' : 'col-span-10'}>
		<slot />
	</div>
	{#if !isCreatePage}
		<div class="col-span-2 flex items-start justify-end">
			<a class="btn" href="/create"> Create new post </a>
		</div>
	{/if}
</div>

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
