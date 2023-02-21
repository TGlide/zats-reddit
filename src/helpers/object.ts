export function omit<T extends Record<string, unknown>, K extends keyof T>(
	keys: K[],
	object: T
): Omit<T, K> {
	const result = {} as Omit<T, K>;

	for (const key in object) {
		if (!keys.includes(key as unknown as K)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			result[key as unknown as keyof Omit<T, K>] = object[key] as any;
		}
	}
	return result;
}
