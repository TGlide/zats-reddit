<div class="mx-auto max-w-lg ">
	<h1 class="text-2xl font-semibold">Create Post</h1>

	<form class="mt-6 flex flex-col gap-4" method="POST">
		<!-- Author -->
		<!-- TODO: Use authenticated user -->
		<input type="hidden" name="author" value="zats-reddit" />
		<!-- Subreddit -->
		<fieldset class="flex flex-col gap-2">
			<label class="required" for="subreddit">Subreddit</label>
			<input
				class="input"
				type="text"
				name="subreddit"
				id="subreddit"
				placeholder="appwrite"
				required
			/>
		</fieldset>
		<!-- Title -->
		<fieldset class="flex flex-col gap-1">
			<label for="title" class="required">Title</label>
			<input
				class="input"
				type="text"
				name="title"
				id="title"
				placeholder="Enter the post title"
				required
			/>
		</fieldset>
		<!-- Description -->
		<fieldset class="flex flex-col gap-1">
			<label for="description">Description</label>
			<textarea
				class="input"
				name="description"
				id="description"
				placeholder="Enter the post description"
			/>
		</fieldset>
		<!-- Submit -->
		<button class="btn" type="submit">Create post</button>
	</form>
</div>
