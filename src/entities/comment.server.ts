import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
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

export const createCommentHandler = createZodFunctionHandler(
	z.object({
		text: z.string().trim().min(1),
		postId: z.string(),
		parentCommentId: z.string().optional(),
		author: z.string().trim().min(1)
	}),
	async (args) => {
		return await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, 'unique()', {
			...args,
			restricted: true
		});
	}
);

export const deleteCommentHandler = createZodFunctionHandler(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		return await databases.deleteDocument(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, id);
	}
);
