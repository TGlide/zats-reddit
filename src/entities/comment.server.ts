import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { documentSchema, documentsListSchema } from './appwrite';
import { buildCommentTree, commentSchema } from './comment';

export async function getComments(postId: string) {
	const comments = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
		Query.equal('postId', postId)
	]);

	const { documents, total } = documentsListSchema(commentSchema).parse(comments);
	return { commentTree: buildCommentTree(documents), comments: total };
}

export async function getNumComments(postId: string) {
	const comments = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
		Query.equal('postId', postId)
	]);

	const { total } = documentsListSchema(commentSchema).parse(comments);
	return total;
}

type PostCommentArgs = {
	postId: string;
	author: string;
	parentCommentId?: string;
};

export async function postComment(args: PostCommentArgs) {
	const { postId, author, parentCommentId } = args;
	const comment = await databases.createDocument(
		APPWRITE_DB,
		APPWRITE_COLLECTION_COMMENTS,
		'unique()',
		{
			postId,
			author,
			parentCommentId
		}
	);

	return documentSchema.extend(commentSchema.shape).parse(comment);
}
