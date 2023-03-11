<script lang="ts">
	import Posts from '$routes/posts.svelte';
	import { filter } from '$routes/stores';

	export let data;
</script>

<svelte:head>
	<title>zats reddit: {$filter}</title>
</svelte:head>

<Posts posts={data.posts} />
