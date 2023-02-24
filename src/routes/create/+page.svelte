<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	$: fieldErrors = form?.errors?.fieldErrors;
</script>

<div class="mx-auto max-w-lg ">
	<h1 class="text-2xl font-semibold">Create Post</h1>

	<form class="mt-4 flex flex-col gap-4" method="POST" use:enhance>
		<!-- Author -->
		<!-- TODO: Use authenticated user -->
		<input type="hidden" name="author" value="zats-reddit" />
		<!-- Subreddit -->
		<fieldset class="flex flex-col gap-2">
			<label class="required" for="subreddit">Subreddit</label>
			<input class="input" type="text" name="subreddit" id="subreddit" placeholder="appwrite" />
			{#if fieldErrors?.subreddit}
				<span class="-mt-1 text-sm text-red-7">{fieldErrors.subreddit.join('. ')}</span>
			{/if}
		</fieldset>
		<!-- Title -->
		<fieldset class="flex flex-col gap-2">
			<label for="title" class="required">Title</label>
			<input class="input" type="text" name="title" id="title" placeholder="Enter the post title" />
			{#if fieldErrors?.title}
				<span class="-mt-1 text-sm text-red-7">{fieldErrors.title.join('. ')}</span>
			{/if}
		</fieldset>
		<!-- Description -->
		<fieldset class="flex flex-col gap-2">
			<label for="description">Description</label>
			<textarea
				class="input"
				name="description"
				id="description"
				placeholder="Enter the post description"
			/>
			{#if fieldErrors?.description}
				<span class="-mt-1 text-sm text-red-7">{fieldErrors.description.join('. ')}</span>
			{/if}
		</fieldset>
		<!-- Submit -->
		<button class="btn" type="submit">Create post</button>
	</form>
</div>
