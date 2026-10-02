import { z } from 'zod';
export const assignmentInput = z.object({
 title: z.string().trim().min(1,'Give your assignment a title.').max(200),
 description: z.string().max(10000).default(''),
 course: z.string().trim().max(100).default(''),
 due: z.string().datetime(),
}).strict();
export type Assignment = z.infer<typeof assignmentInput> & { id: string };
