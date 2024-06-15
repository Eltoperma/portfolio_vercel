import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2).max(20),
	message: z.string().min(5).max(500)
});

export type FormSchema = typeof formSchema;
