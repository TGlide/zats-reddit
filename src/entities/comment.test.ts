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
				parentCommentId: null,
				$collectionId: '',
				$permissions: [],
				$databaseId: '',
				$updatedAt: ''
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-a',
				postId: '',
				parentCommentId: 'a',
				$collectionId: '',
				$permissions: [],
				$databaseId: '',
				$updatedAt: ''
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-b',
				postId: '',
				parentCommentId: 'a',
				$collectionId: '',
				$permissions: [],
				$databaseId: '',
				$updatedAt: ''
			},
			{
				text: 'Text',
				upvotes: 0,
				downvotes: 0,
				authorId: 'Author',
				$createdAt: '',
				$id: 'a-b-a',
				postId: '',
				parentCommentId: 'a-b',
				$collectionId: '',
				$permissions: [],
				$databaseId: '',
				$updatedAt: ''
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
				$collectionId: '',
				$permissions: [],
				$databaseId: '',
				$updatedAt: '',
				children: [
					{
						text: 'Text',
						upvotes: 0,
						downvotes: 0,
						authorId: 'Author',
						$createdAt: '',
						$id: 'a-a',
						postId: '',
						$collectionId: '',
						$permissions: [],
						$databaseId: '',
						$updatedAt: ''
					},
					{
						text: 'Text',
						upvotes: 0,
						downvotes: 0,
						authorId: 'Author',
						$createdAt: '',
						$id: 'a-b',
						postId: '',
						$collectionId: '',
						$permissions: [],
						$databaseId: '',
						$updatedAt: '',
						children: [
							{
								text: 'Text',
								upvotes: 0,
								downvotes: 0,
								authorId: 'Author',
								$createdAt: '',
								$id: 'a-b-a',
								postId: '',
								$collectionId: '',
								$permissions: [],
								$databaseId: '',
								$updatedAt: ''
							}
						]
					}
				]
			}
		]);
	});
});
