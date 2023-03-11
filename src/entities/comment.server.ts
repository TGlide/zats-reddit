import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentSchema, documentsListSchema } from './appwrite';
import { buildCommentTree, commentSchema, type Comment } from './comment';
import { getUser } from './user.server';

type GetCommentsArgs = {
	postId: string;
	authorId?: string;
};

export async function getComments(args: GetCommentsArgs) {
	const promises = await Promise.all([
		await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
			Query.equal('postId', args.postId),
			Query.notEqual('restricted', true)
		]),
		args.authorId
			? await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
					Query.equal('postId', args.postId),
					Query.equal('authorId', args.authorId),
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

	const documentsWithAuthorName = await Promise.all(
		documents.map(async (comment) => {
			const authorName = await getUser({ uuid: comment.authorId }).then((user) => user?.name);
			return { ...comment, authorName };
		})
	);

	return { commentTree: buildCommentTree(documentsWithAuthorName), total };
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
		authorId: z.string().trim().min(1)
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
