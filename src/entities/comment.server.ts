import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { truthyArray } from '$helpers/array';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases, isAdmin } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentSchema, documentsListSchema } from './appwrite';
import { buildCommentTree, commentSchema, type Comment } from './comment';

type GetCommentsArgs = {
	postId: string;
	authorId?: string;
};

export async function getComments(args: GetCommentsArgs) {
	const promises = await Promise.all([
		await databases.listDocuments(
			APPWRITE_DB,
			APPWRITE_COLLECTION_COMMENTS,
			truthyArray([
				Query.equal('postId', args.postId),
				!isAdmin && Query.notEqual('restricted', true)
			])
		),
		args.authorId
			? await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
					Query.equal('postId', args.postId),
					Query.equal('authorId', args.authorId),
					Query.equal('restricted', true)
			  ])
			: undefined
	]);

	const documents: Comment[] = promises.reduce<Comment[]>((acc, promise) => {
		const result = documentsListSchema(commentSchema).safeParse(promise);
		if (!result.success) return acc;
		return [...acc, ...result.data.documents];
	}, []);

	return buildCommentTree(documents);
}

type PostCommentArgs = {
	postId: string;
	authorId: string;
	parentCommentId?: string;
};

export async function postComment(args: PostCommentArgs) {
	const { postId, authorId, parentCommentId } = args;
	const comment = await databases.createDocument(
		APPWRITE_DB,
		APPWRITE_COLLECTION_COMMENTS,
		'unique()',
		{
			postId,
			authorId,
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
		authorId: z.string().trim().min(1),
		authorName: z.string().trim().min(1)
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
