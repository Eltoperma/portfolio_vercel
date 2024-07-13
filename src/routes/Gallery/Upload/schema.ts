import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const formSchema = z.object({
	title: z.string().min(2).max(20),
	description: z.string().min(5).max(500),
	image: z
	.instanceof(File)
    .refine((file:File) => file?.size <= MAX_FILE_SIZE, `Bilder dürfen maximal 5MB groß sein.`)
    .refine(
      (file:File) => ACCEPTED_IMAGE_TYPES.includes(file?.type.toLowerCase()),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
	});

export type FormSchema = typeof formSchema;

