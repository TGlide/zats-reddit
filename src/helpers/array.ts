export function toggle<T>(value: T, array: T[]): T[] {
	const index = array.indexOf(value);
	if (index === -1) {
		return [...array, value];
	}
	return [...array.slice(0, index), ...array.slice(index + 1)];
}
