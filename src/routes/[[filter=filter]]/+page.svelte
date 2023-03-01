<script lang="ts">
	import { page } from '$app/stores';
	import Posts from '$routes/posts.svelte';
	import { filter } from '$routes/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>zats reddit: {$filter}</title>
</svelte:head>

<Posts posts={data.posts} />
