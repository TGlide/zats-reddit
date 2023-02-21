import { z } from 'zod';

export function documentsListSchema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		documents: z.array(schema)
	});
}
