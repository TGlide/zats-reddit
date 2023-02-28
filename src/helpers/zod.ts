import type { z } from 'zod';

export function createZodFunctionHandler<
	Schema extends z.ZodTypeAny,
	Fn extends (input: z.infer<Schema>) => unknown
>(schema: Schema, fn: Fn) {
	function parse(input: Parameters<Schema['safeParse']>[0]) {
		const result = schema.safeParse(input);

		if (result.success) {
			return {
				data: result.data,
				success: true,
				execute: () => fn(result.data) as ReturnType<Fn>
			} as {
				data: z.infer<Schema>;
				success: true;
				execute: () => ReturnType<Fn>;
			};
		} else {
			return {
				success: false as const,
				error: result.error as z.ZodError<z.infer<Schema>>
			};
		}
	}

	return {
		parse,
		fn
	};
}
