import { APPWRITE_DB, APPWRITE_COLLECTION_VOTES } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';

type GetVotesArgs = {
	author: string;
	postId?: string;
};

export async function getVotes({ author, postId }: GetVotesArgs) {
	const votes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
		Query.equal('author', author),
		...(postId ? [Query.equal('postId', postId)] : [])
	]);
	return votes.documents;
}

export const voteHandler = createZodFunctionHandler(
	z.object({
		postId: z.string().trim().min(1),
		direction: z.enum(['UP', 'DOWN', 'NONE']),
		author: z.string().trim().min(1),
		// We use this in the form action to redirect back to the post
		redirectTo: z.string().url()
	}),
	async ({ author, postId, direction }) => {
		// Check if user has already voted on this post
		// If so, update the vote. Otherwise, create a new vote.
		const votes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
			Query.equal('author', author),
			Query.equal('postId', postId)
		]);
		const vote = votes.documents[0];

		if (vote) {
			await databases.updateDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, vote.$id, {
				direction
			});
		} else {
			await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, 'unique()', {
				author,
				postId,
				direction
			});
		}
	}
);
