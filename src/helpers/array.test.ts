import { describe, expect, it } from 'vitest';
import { toggle } from './array';

describe('Array', () => {
	it('should correctly toggle values in an array', () => {
		const array = [1, 2, 3];
		expect(toggle(1, array)).toEqual([2, 3]);
		expect(toggle(2, array)).toEqual([1, 3]);
		expect(toggle(3, array)).toEqual([1, 2]);
		expect(toggle(4, array)).toEqual([1, 2, 3, 4]);
	});
});
