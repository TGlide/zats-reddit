import { describe, expect, it } from 'vitest';
import { omit } from './object';

describe('Object omit', () => {
	const tests: Array<{
		args: Parameters<typeof omit>;
		expected: ReturnType<typeof omit>;
	}> = [
		{
			args: [['a'], { a: 1, b: 2, c: 3 }],
			expected: { b: 2, c: 3 }
		},
		{
			args: [['a'], { a: 1, b: 2, c: 3, d: { a: 1, b: 2, c: 3 } }],
			expected: { b: 2, c: 3, d: { a: 1, b: 2, c: 3 } }
		},
		{
			args: [['a'], { a: 1, b: 2, c: 3, d: { a: 1, b: 2, c: 3, e: { a: 1, b: 2, c: 3 } } }],
			expected: { b: 2, c: 3, d: { a: 1, b: 2, c: 3, e: { a: 1, b: 2, c: 3 } } }
		},
		{
			args: [['a', 'b'], { a: 1, b: 2, c: 3, d: { a: 1, b: 2, c: 3, e: { a: 1, b: 2, c: 3 } } }],
			expected: { c: 3, d: { a: 1, b: 2, c: 3, e: { a: 1, b: 2, c: 3 } } }
		}
	];

	for (const { args, expected } of tests) {
		it(`should omit ${args[0]} from ${JSON.stringify(args[1])}`, () => {
			expect(omit(...args)).toEqual(expected);
		});
	}
});
