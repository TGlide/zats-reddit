import { APPWRITE_COLLECTION_VOTES, APPWRITE_DB } from '$env/static/private';
import { createZodFunctionHandler } from '$helpers/zod';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';
import { documentsListSchema } from './appwrite';
import { voteSchema } from './vote';

type GetVotesArgs = {
	author: string;
	parentId?: string;
};

export async function getVotes({ author, parentId }: GetVotesArgs) {
	const votes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
		Query.equal('author', author),
		...(parentId ? [Query.equal('parentId', parentId)] : [])
	]);
	const voteDocs = documentsListSchema(voteSchema).parse(votes);
	return voteDocs.documents;
}

export const voteHandler = createZodFunctionHandler(
	voteSchema.extend({
		// We use this in the form action to redirect back to the post
		redirectTo: z.string().url()
	}),
	async ({ author, parentId, direction, parentType }) => {
		// Check if user has already voted on this post
		// If so, update the vote. Otherwise, create a new vote.
		const votes = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, [
			Query.equal('author', author),
			Query.equal('parentId', parentId)
		]);
		const vote = votes.documents[0];

		if (vote) {
			await databases.updateDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, vote.$id, {
				direction
			});
		} else {
			await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_VOTES, 'unique()', {
				author,
				parentId,
				direction,
				parentType
			});
		}
	}
);
