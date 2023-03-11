import { describe, expect, it } from 'vitest';
import { buildCommentTree, type Comment } from './comment';

describe('Comment', () => {
	it('should correctly build a comment tree', () => {
		const comments: Comment[] = [
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a',
				postId: '',
				parentCommentId: null
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-a',
				postId: '',
				parentCommentId: 'a'
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-b',
				postId: '',
				parentCommentId: 'a'
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-b-a',
				postId: '',
				parentCommentId: 'a-b'
			}
		];

		const commentTree = buildCommentTree(comments);

		expect(commentTree).toEqual([
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a',
				postId: '',
				children: [
					{
						text: 'Text',
						upvotes: 0,
						downvotes: 0,
						authorId: 'Author',
						$createdAt: '',
						$id: 'a-a',
						postId: ''
					},
					{
						text: 'Text',
						upvotes: 0,
						downvotes: 0,
						authorId: 'Author',
						$createdAt: '',
						$id: 'a-b',
						postId: '',
						children: [
							{
								text: 'Text',
								upvotes: 0,
								downvotes: 0,
								authorId: 'Author',
								$createdAt: '',
								$id: 'a-b-a',
								postId: ''
							}
						]
					}
				]
			}
		]);
	});
});
