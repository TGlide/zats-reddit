import { APPWRITE_COLLECTION_VOTES, APPWRITE_DB } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { Query } from 'appwrite';
import { z } from 'zod';

export const voteSchema = z.object({
	postId: z.string().trim().min(1),
	author: z.string().trim().min(1),
	direction: z.enum(['UP', 'DOWN'])
});

export type Vote = z.infer<typeof voteSchema>;

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
