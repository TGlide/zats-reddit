import { randomPick } from '$helpers/array';
import type { Cookies } from '@sveltejs/kit';

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

export const getSession = (cookies: Cookies) => {
	let user = cookies.get('username');
	if (!user) {
		user = getRandomUsername();
		cookies.set('username', user, { path: '/' });
	}

	return user;
};
