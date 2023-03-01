<script lang="ts">
	import type { Post } from '$entities/post';
	import Icon from '$UI/Icon.svelte';
	import Votes from './Votes.svelte';

	export let post: Post;

	const commentsHref = `/r/${post.subreddit}/${post.$id}`;
</script>

<div class="flex items-center gap-4">
	<Votes entry={post} />

	<div class="grid h-14 w-14 place-items-center rounded-md bg-gray-5/75">
		<svg class="h-8 w-8 text-white">
			<use href="/icons/text.svg#text" />
		</svg>
	</div>

	<div>
		<a class="font-semibold text-blue-8 hover:underline" href={commentsHref}>
			{post.title}
		</a>
		<div class="flex items-center gap-4">
			<a class="cursor-pointer text-sm text-gray-9  hover:underline" href={`/r/${post.subreddit}`}>
				{`r/${post.subreddit}`}
			</a>
			<div class="flex items-center gap-1 text-gray-9">
				<Icon name="messages" size={16} />
				<a class="cursor-pointer text-sm   hover:underline" href={commentsHref}>
					{`${post.comments} ${post.comments === 1 ? 'comment' : 'comments'}`}
				</a>
			</div>
		</div>
	</div>
</div>
