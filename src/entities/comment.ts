import { APPWRITE_COLLECTION_COMMENTS, APPWRITE_DB } from '$env/static/private';
import { omit } from '$helpers/object';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentsListSchema } from './appwrite';

export const commentSchema = z.object({
	text: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	author: z.string(),
	$createdAt: z.string(),
	$id: z.string(),
	postId: z.string(),
	parentCommentId: z.string().nullable()
});

export type Comment = z.infer<typeof commentSchema>;

export type CommentTreeItem = Omit<Comment, 'parentCommentId'> & {
	children?: CommentTreeItem[];
};

export type CommentTree = CommentTreeItem[];

function findComment(id: string, commentTree: CommentTree): CommentTreeItem | null {
	for (const comment of commentTree) {
		if (comment.$id === id) {
			return comment;
		} else if (comment.children) {
			const foundComment = findComment(id, comment.children);
			if (foundComment) {
				return foundComment;
			}
		}
	}

	return null;
}

export function buildCommentTree(comments: Comment[]) {
	const commentMap: Record<string, CommentTreeItem> = Object.fromEntries(
		comments.map((comment) => [comment.$id, comment])
	);

	for (const comment of comments) {
		if (!comment.parentCommentId) {
			commentMap[comment.$id] = {
				...omit(['parentCommentId'], comment),
				children: []
			};
		} else {
			const parent = findComment(comment.parentCommentId, Object.values(commentMap));
			if (parent) {
				parent.children = parent.children || [];
				parent.children.push(omit(['parentCommentId'], comment));
				delete commentMap[comment.$id];
			}
		}
	}

	return Object.values(commentMap);
}

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
