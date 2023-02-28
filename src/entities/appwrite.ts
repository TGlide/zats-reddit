import { z } from 'zod';

export function documentsListSchema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		documents: z.array(schema),
		total: z.number()
	});
}

export const documentSchema = z.object({
	$id: z.string(),
	$collectionId: z.string(),
	$databaseId: z.string(),
	$createdAt: z.string(),
	$updatedAt: z.string(),
	$permissions: z.array(z.string())
});
