import { z } from 'zod';
import type { Comment, commentSchema } from './comment';

export function documentsListSchema<T extends z.AnyZodObject>(schema: T) {
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

type Document<T extends z.AnyZodObject> = z.infer<T> & z.infer<typeof documentSchema>;
