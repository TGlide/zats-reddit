import { APPWRITE_COLLECTION_TEXT_POSTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { documentsListSchema } from './appwrite';
import { getComments, getNumComments } from './comment.server';
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
			const numComments = await getNumComments(post.$id);
			return { ...post, comments: numComments };
		})
	);

	return postsWithNumComments;
}

type GetPostArgs = {
	postId: string;
	author?: string;
};

export async function getPost(args: GetPostArgs): Promise<ExpandedPost> {
	const posts = await (args.author
		? databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, [
				Query.equal('$id', args.postId),
				Query.equal('author', args.author),
				Query.equal('restricted', true)
		  ])
		: databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, [
				Query.equal('$id', args.postId),
				Query.notEqual('restricted', true)
		  ]));

	const parsedPosts = documentsListSchema(postSchema).parse(posts);
	const post = parsedPosts.documents[0];
	if (!post) {
		throw new Error(`Post with id '${args.postId}' not found`);
	}
	const { commentTree, comments } = await getComments(args.postId);

	return {
		...post,
		commentTree,
		comments
	};
}
