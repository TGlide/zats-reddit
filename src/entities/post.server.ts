import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentSchema, documentsListSchema } from './appwrite';
import { getComments } from './comment.server';
import { postSchema, type ExpandedPost, type Post } from './post';

type GetPostsArgs = {
	subreddit?: string;
	author?: string;
};

export async function getPosts(args?: GetPostsArgs): Promise<Post[]> {
	const userPostsPromise = args?.author
		? databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, [
				...(args?.subreddit ? [Query.equal('subreddit', args?.subreddit)] : []),
				Query.equal('author', args.author),
				Query.equal('restricted', true)
		  ])
		: undefined;

	const adminPostsPromise = databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, [
		...(args?.subreddit ? [Query.equal('subreddit', args?.subreddit)] : []),
		Query.notEqual('restricted', true)
	]);

	const [userPosts, adminPosts] = await Promise.all([userPostsPromise, adminPostsPromise]);

	const userPostsDocsList = userPosts
		? documentsListSchema(postSchema).parse(userPosts)
		: { documents: [] };
	const adminPostsDocsList = documentsListSchema(postSchema).parse(adminPosts);

	const allDocs = [...userPostsDocsList.documents, ...adminPostsDocsList.documents];

	const postsWithNumComments: Post[] = await Promise.all(
		allDocs.map(async (post) => {
			const comments = await getComments({ postId: post.$id, author: args?.author });
			return { ...post, numComments: comments.total };
		})
	);

	return postsWithNumComments;
}

type GetPostArgs = {
	postId: string;
	author?: string;
};

export async function getPost(args: GetPostArgs): Promise<ExpandedPost> {
	try {
		const post = await databases.getDocument(
			APPWRITE_DB,
			APPWRITE_COLLECTION_TEXT_POSTS,
			args.postId
		);
		const parsedPost = documentSchema.extend(postSchema.shape).parse(post);

		if (parsedPost.restricted && parsedPost.author !== args.author) {
			throw new Error('Unauthorized');
		}

		const { commentTree, total } = await getComments({ ...args });

		return {
			...parsedPost,
			commentTree,
			numComments: total
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
		author: z.string().trim().min(1)
	}),
	async (args) => {
		return await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, 'unique()', {
			...args,
			restricted: true
		});
	}
);
