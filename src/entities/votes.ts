import { toggle } from '$helpers/array';
import { localStorageWritable } from '$helpers/localStorageWritable';

type Store = {
	upvoted: string[];
	downvoted: string[];
};

const initialState: Store = {
	upvoted: [],
	downvoted: []
};

export const votes = (function initialize() {
	const methods = localStorageWritable<Store>('votes', initialState);

	function upvote(postId: string) {
		methods.update((store) => {
			store.upvoted = toggle(postId, store.upvoted);
			store.downvoted = store.downvoted.filter((id) => id !== postId);
			return store;
		});
	}

	function downvote(postId: string) {
		methods.update((store) => {
			store.downvoted = toggle(postId, store.downvoted);
			store.upvoted = store.upvoted.filter((id) => id !== postId);
			return store;
		});
	}

	return {
		...methods,
		upvote,
		downvote
	};
})();
