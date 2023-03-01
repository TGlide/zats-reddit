<script lang="ts">
	import { page } from '$app/stores';
	import { Filter } from '$entities/filter';
	import '$styles/index.css';
	import { user, filter } from './stores';

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
		{ href: getHref('/controversial', subreddit), name: Filter.Controversial }
	] satisfies Path[];

	$: isCreatePage = $page.url.pathname === '/create';
	$: isPostPage = $page.url.pathname.match(/^\/r\/.+?\/.+?$/);
</script>

<svelte:head>
	<link rel="preload" href="/logo.webp" as="image" />
</svelte:head>

<nav
	class="grid grid-cols-12 gap-2 border-b border-solid border-b-blue-5 bg-blue-1 px-2 lg:flex lg:items-end lg:gap-4 lg:px-4"
>
	<a href="/" class="col-span-5 shrink-0">
		<img src="/logo.webp" alt="logo" width="118.44" height="49" class="p-1" />
	</a>

	{#if subreddit}
		<a class="col-span-12 row-start-2 text-lg font-light hover:underline" href={`/r/${subreddit}`}
			>r/{subreddit}</a
		>
	{/if}

	{#if !isCreatePage}
		<ul class="row-start-3 -mb-px flex items-end  gap-2">
			{#each paths as path}
				<li class="nav-tag" data-active={$filter === path.name}>
					<a href={path.href}>{path.name}</a>
				</li>
			{/each}
		</ul>
	{/if}

	<div
		class="col-span-7 flex justify-end self-end whitespace-nowrap pb-0.5 lg:ml-auto lg:self-center lg:pb-0"
	>
		<span class="tag">
			User: {$user}
		</span>
	</div>
</nav>

<div class="flex flex-col-reverse gap-4 px-2 py-4 lg:grid lg:grid-cols-12 lg:gap-0 lg:p-4">
	<div class={isCreatePage ? 'col-span-12' : 'col-span-10'}>
		<slot />
	</div>
	{#if !isCreatePage && !isPostPage}
		<div class="col-span-2 flex items-start lg:justify-end">
			<a class="btn" href="/create"> Create new post </a>
		</div>
	{/if}
</div>

<style lang="postcss">
	.tag,
	.nav-tag {
		background-color: theme(colors.white);
		border: 1px solid transparent;

		border-radius: theme('borderRadius.sm');
		color: theme(colors.blue.8);

		font-size: theme(fontSize.sm);
		font-weight: theme(fontWeight.bold);

		padding-inline: theme(spacing.2);
	}

	.nav-tag {
		border-bottom-color: theme(colors.blue.5);
		border-radius: 4px 4px 0 0;

		&[data-active='true'] {
			border-color: theme(colors.blue.5);
			border-bottom-color: theme(colors.white);
			background-color: theme(colors.white);
			color: theme(colors.pink.5);
		}
	}
</style>
