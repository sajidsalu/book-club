import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  publishedYear: z.number().optional(),
  authorId: z.number().min(1, "Author is required"),
});
