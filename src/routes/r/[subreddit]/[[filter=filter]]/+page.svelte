<script lang="ts">
	import Posts from '$routes/posts.svelte';
	import { filter, subreddit } from '$routes/stores';

	export let data;
</script>

<svelte:head>
	<title>zats reddit: /r/{$subreddit} - {$filter}</title>
</svelte:head>

<Posts posts={data.posts} />
