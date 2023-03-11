<script lang="ts">
	import type { Post } from '$entities/post';
	import Icon from '$UI/Icon.svelte';
	import Votes from './Votes.svelte';

	export let post: Post;

	const commentsHref = `/r/${post.subreddit}/${post.$id}`;
</script>

<div class="flex items-center gap-4">
	<Votes entry={post} />

	<div class="grid h-14 w-14 flex-shrink-0 place-items-center rounded-md bg-gray-5/75 text-white">
		<Icon name="text" size={32} />
	</div>

	<div>
		<a class="font-semibold text-blue-8 hover:underline" href={commentsHref}>
			{post.title}
		</a>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-9">
			<a class="cursor-pointer hover:underline" href={`/r/${post.subreddit}`}>
				{`r/${post.subreddit}`}
			</a>
			<div class="flex items-center gap-1">
				<Icon name="messages" size={16} />
				<a class="cursor-pointer    hover:underline" href={commentsHref}>
					{`${post.numComments} ${post.numComments === 1 ? 'comment' : 'comments'}`}
				</a>
			</div>
			<span>by {post.authorName ?? 'unknown author'}</span>
		</div>
	</div>
</div>
