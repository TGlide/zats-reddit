import { Client, Databases, Query } from 'appwrite';
import * as dotenv from 'dotenv';
dotenv.config();

// Setup
const {
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT,
	APPWRITE_DB,
	APPWRITE_COLLECTION_TEXT_POSTS,
	APPWRITE_COLLECTION_COMMENTS,
	APPWRITE_COLLECTION_VOTES,
	APPWRITE_COLLECTION_USERS,
	APPWRITE_ADMIN_MODE
} = process.env;

const client = new Client();
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
const databases = new Databases(client);

// Helpers
const getUser = async (userId) => {
	const res = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_USERS, [
		Query.equal('uuid', userId)
	]);

	try {
		return res.documents[0] || null;
	} catch {
		return null;
	}
};

const getNumComments = async (postId) => {
	const res = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, [
		Query.equal('postId', postId)
	]);

	return res.total || 0;
};

// Main
const posts = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS);
posts.documents.forEach(async (post) => {
	const { authorId } = post;
	const { name } = await getUser(authorId);
	const numComments = await getNumComments(post.$id);

	if (name !== null) {
		await databases.updateDocument(APPWRITE_DB, APPWRITE_COLLECTION_TEXT_POSTS, post.$id, {
			authorName: name,
			numComments
		});
	}
});

const comments = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS);
comments.documents.forEach(async (comment) => {
	const { authorId } = comment;
	const { name } = await getUser(authorId);

	if (name !== null) {
		await databases.updateDocument(APPWRITE_DB, APPWRITE_COLLECTION_COMMENTS, comment.$id, {
			authorName: name
		});
	}
});
