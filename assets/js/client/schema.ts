import { z } from 'zod';

export const blogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  inserted_at: z.string().datetime({ precision: 3}),
  updated_at: z.string().datetime({ precision: 3})
});

export type BlogPost = z.infer<typeof blogPostSchema>;

