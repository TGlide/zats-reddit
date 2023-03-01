// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounced<Fn extends (...args: any[]) => void>(fn: Fn, delay: number) {
	let timeoutId: NodeJS.Timeout;

	return function (...args: Parameters<Fn>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			return fn(...args);
		}, delay);
	};
}
