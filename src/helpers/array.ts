export function toggle<T>(value: T, array: T[]): T[] {
	const index = array.indexOf(value);
	if (index === -1) {
		return [...array, value];
	}
	return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function randomPick<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}
