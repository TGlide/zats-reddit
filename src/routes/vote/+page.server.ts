import {
	APPWRITE_COLLECTION_TEXT_POSTS,
	APPWRITE_COLLECTION_VOTES,
	APPWRITE_DB
} from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { getSession } from '$lib/session.server';
import { error, redirect } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { z } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request, cookies, url }) {
		const user = getSession(cookies);
		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const dataObj = Object.fromEntries(formData.entries());

		const inputSchema = z.object({
			redirectTo: z.string().url(),
			postId: z.string().trim().min(1),
			direction: z.enum(['UP', 'DOWN'])
		});

		const result = inputSchema.safeParse(dataObj);
		if (result.success) {
			// Check if user has already voted on this post
			// If so, update the vote. Otherwise, create a new vote.
			const votes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
				Query.equal('author', user),
				Query.equal('postId', result.data.postId)
			]);
			const vote = votes.documents[0];
			if (vote) {
				if (vote.direction === result.data.direction) {
					await databases.deleteDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, vote.$id);
				} else {
					await databases.updateDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, vote.$id, {
						direction: result.data.direction
					});
				}
			} else {
				await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, 'unique()', {
					author: user,
					postId: result.data.postId,
					direction: result.data.direction
				});
			}

			// Update the post's vote count
			// TODO: use Appwrite functions to do this
			const postVotes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
				Query.equal('postId', result.data.postId)
			]);
			const upvotes = postVotes.documents.reduce((acc, vote) => {
				return vote.direction === 'UP' ? acc + 1 : acc;
			}, 0);
			const downvotes = postVotes.total - upvotes;

			await databases.updateDocument(
				APPWRITE_DB,
				APPWRITE_COLLECTION_TEXT_POSTS,
				result.data.postId,
				{ upvotes, downvotes }
			);

			throw redirect(303, result.data.redirectTo);
		} else {
			throw error(500, 'Invalid input');
		}
	}
};
