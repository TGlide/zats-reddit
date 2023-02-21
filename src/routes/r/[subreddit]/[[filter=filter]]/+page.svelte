<script lang="ts">
	import Posts from '$routes/posts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Posts posts={data.posts} />
