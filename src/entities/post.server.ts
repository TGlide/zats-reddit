import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { truthyArray, uniqueByKey } from '$helpers/array';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases, isAdmin } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentSchema, documentsListSchema } from './appwrite';
import { getComments } from './comment.server';
import { postSchema, type ExpandedPost, type Post } from './post';

type GetPostsArgs = {
	subreddit?: string;
	authorId?: string;
};

export async function getPosts(args?: GetPostsArgs): Promise<Post[]> {
	const promises = await Promise.all([
		args?.authorId
			? databases.listDocuments(
					APPWRITE_DB,
					APPWRITE_COLLECTION_TEXT_POSTS,
					truthyArray([
						args?.subreddit && Query.equal('subreddit', args?.subreddit),
						Query.equal('authorId', args.authorId),
						Query.equal('restricted', true)
					])
			  )
			: undefined,
		databases.listDocuments(
			APPWRITE_DB,
			APPWRITE_COLLECTION_TEXT_POSTS,
			truthyArray([
				args?.subreddit && Query.equal('subreddit', args?.subreddit),
				!isAdmin && Query.notEqual('restricted', true)
			])
		)
	]);

	const documents = promises.reduce<z.infer<typeof postSchema>[]>((acc, promise) => {
		const result = documentsListSchema(postSchema).safeParse(promise);
		if (!result.success) return acc;

		return [...acc, ...result.data.documents];
	}, []);

	return uniqueByKey(documents, '$id');
}

type GetPostArgs = {
	postId: string;
	authorId?: string;
};

export async function getPost(args: GetPostArgs): Promise<ExpandedPost> {
	try {
		const post = await databases.getDocument(
			APPWRITE_DB,
			APPWRITE_COLLECTION_TEXT_POSTS,
			args.postId
		);
		const parsedPost = documentSchema.extend(postSchema.shape).parse(post);

		if (parsedPost.restricted && parsedPost.authorId !== args.authorId && !isAdmin) {
			throw new Error('Unauthorized');
		}

		const commentTree = await getComments({ ...args });

		return {
			...parsedPost,
			commentTree
		};
	} catch (e) {
		console.error(e);
		throw new Error(`Post with id '${args.postId}' not found`);
	}
}

export const createPostHandler = createZodFunctionHandler(
	z.object({
		title: z.string().trim().min(1),
		subreddit: z.string().trim().min(1),
		description: z.string().optional(),
		authorId: z.string().trim().min(1),
		authorName: z.string().trim().min(1)
	}),
	async (args) => {
		return await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, 'unique()', {
			...args,
			restricted: true
		});
	}
);
