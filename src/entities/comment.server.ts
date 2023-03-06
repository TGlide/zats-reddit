import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentSchema, documentsListSchema } from './appwrite';
import { buildCommentTree, commentSchema, type Comment } from './comment';

type GetCommentsArgs = {
	postId: string;
	author?: string;
};

export async function getComments(args: GetCommentsArgs) {
	const promises = await Promise.all([
		await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
			Query.equal('postId', args.postId),
			Query.notEqual('restricted', true)
		]),
		args.author
			? await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
					Query.equal('postId', args.postId),
					Query.equal('author', args.author),
					Query.equal('restricted', true)
			  ])
			: undefined
	]);

	const documents: Comment[] = [];
	let total = 0;

	promises.forEach((promise) => {
		const result = documentsListSchema(commentSchema).safeParse(promise);
		if (!result.success) return;

		documents.push(...result.data.documents);
		total += result.data.total;
	});

	return { commentTree: buildCommentTree(documents), total };
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
