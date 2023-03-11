import { APPWRITE_COLLECTION_USERS, APPWRITE_DB } from '$env/static/private';
import { randomPick } from '$helpers/array';
import { databases } from '$lib/appwrite.server';
import type { Cookies } from '@sveltejs/kit';
import { documentsListSchema } from './appwrite';
import { userSchema } from './user';
import { v4 as uuidV4 } from 'uuid';
import { Query } from 'appwrite';

function getRandomUsername() {
	const adjectives = [
		'adorable',
		'beautiful',
		'clean',
		'drab',
		'elegant',
		'fancy',
		'glamorous',
		'handsome',
		'long',
		'magnificent',
		'old-fashioned',
		'quaint',
		'sparkling',
		'sightly',
		'rabid',
		'bewildered',
		'clumsy',
		'victorious',
		'embarrassed',
		'fierce',
		'grumpy',
		'helpful',
		'itchy',
		'jazzy',
		'lazy',
		'mysterious',
		'nervous',
		'obnoxious',
		'panicky',
		'quaint',
		'repulsive',
		'scary',
		'thoughtful',
		'worried'
	];

	const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'teal', 'pink', 'cyan'];

	const animals = [
		'ant',
		'bear',
		'cat',
		'camel',
		'dog',
		'duck',
		'elephant',
		'fish',
		'fly',
		'fox',
		'frog',
		'giraffe',
		'goat',
		'goldfish',
		'horse',
		'kangaroo',
		'kitten',
		'lion',
		'lizard',
		'octopus',
		'owl',
		'puppy',
		'rabbit',
		'snake',
		'spider',
		'tiger',
		'turtle',
		'wolf',
		'zebra'
	];

	return `${randomPick(adjectives)}-${randomPick(colors)}-${randomPick(animals)}`;
}

type GetUserArgs = {
	uuid: string;
};
export async function getUser(args: GetUserArgs) {
	const res = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_USERS, [
		Query.equal('uuid', args.uuid)
	]);

	try {
		const userDocs = documentsListSchema(userSchema).parse(res);
		return userDocs.documents[0] || null;
	} catch {
		return null;
	}
}

export async function getUsers() {
	const res = await databases.listDocuments(APPWRITE_DB, APPWRITE_COLLECTION_USERS);
	const userDocs = documentsListSchema(userSchema).parse(res);
	return userDocs.documents;
}

export async function getUserSession(cookies: Cookies) {
	const users = await getUsers();

	const user = cookies.get('user');
	if (user) {
		const parsedUser = userSchema.safeParse(JSON.parse(user));
		if (parsedUser.success) {
			const userData = parsedUser.data;
			const serverUser = users.find((u) => u.uuid === userData.uuid);

			if (userData.name === serverUser?.name) {
				return userData;
			}
		}
		cookies.delete('user');
	}

	let username = '';
	while (!username || users.map((u) => u.name).includes(username)) {
		username = getRandomUsername();
	}

	const newUser = {
		name: username,
		uuid: uuidV4()
	};

	await databases.createDocument(APPWRITE_DB, APPWRITE_COLLECTION_USERS, 'unique()', newUser);

	cookies.set('user', JSON.stringify(newUser), { path: '/' });
	return newUser;
}
