import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(2, "Author name is required"),
  bio: z.string().min(5, "Bio should be at least 5 characters"),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
