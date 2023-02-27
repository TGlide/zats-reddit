import type { Models } from 'appwrite';
import { z } from 'zod';

export function documentsListSchema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		documents: z.array(schema),
		total: z.number()
	});
}

// TODO: improve types
export function documentSchema<
	Schema extends z.ZodObject<z.ZodRawShape> = z.ZodObject<z.ZodRawShape>
>(schema: Schema) {
	const docSchema = z.object({
		$id: z.string(),
		$collectionId: z.string(),
		$databaseId: z.string(),
		$createdAt: z.string(),
		$updatedAt: z.string(),
		$permissions: z.array(z.string())
	});

	return docSchema.extend(schema.shape) as typeof docSchema & Schema;
}
