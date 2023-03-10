import { omit } from '$helpers/object';
import { z } from 'zod';
import { documentSchema } from './appwrite';

export const commentSchema = documentSchema.extend({
	text: z.string(),
	upvotes: z.number(),
	downvotes: z.number(),
	authorId: z.string(),
	authorName: z.string().nullable(),
	postId: z.string(),
	parentCommentId: z.string().nullable()
});

export type Comment = z.infer<typeof commentSchema>;

export function isComment(obj: unknown): obj is Comment {
	return commentSchema.safeParse(obj).success;
}

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

export function commentScore(comment: Comment | CommentTreeItem) {
	return comment.upvotes - comment.downvotes;
}
