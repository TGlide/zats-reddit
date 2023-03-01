<script lang="ts">
	import Posts from '$routes/posts.svelte';
	import { filter, subreddit } from '$routes/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>zats reddit: /r/{$subreddit} - {$filter}</title>
</svelte:head>

<Posts posts={data.posts} />
