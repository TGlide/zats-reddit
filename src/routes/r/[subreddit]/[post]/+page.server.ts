import { documentsListSchema } from '$entities/appwrite';
import { buildCommentTree, commentSchema } from '$entities/comment';
import { postSchema } from '$entities/post';
import {
	APPWRITE_COLLECTION_COMMENTS,
	APPWRITE_COLLECTION_TEXT_POSTS,
	APPWRITE_DB
} from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, [
		Query.equal('$id', params.post)
	]);
	const comments = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
		Query.equal('postId', params.post)
	]);

	const parsedPosts = documentsListSchema(postSchema).parse(posts);
	if (parsedPosts.documents.length === 0) throw error(404, 'Post not found');

	const parsedComments = documentsListSchema(commentSchema).parse(comments);
	const commentTree = buildCommentTree(parsedComments.documents);

	return {
		post: parsedPosts.documents[0],
		commentTree
	};
};
