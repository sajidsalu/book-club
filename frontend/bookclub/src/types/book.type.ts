import { bookSchema } from "@/pages/Books/books.config";
import z from "zod";
import { Author } from "./author.type";

export type Book = {
  id: number;
  title: string;
  description?: string;
  publishedYear?: number;
  author: Author;
};

export type BookFormData = z.infer<typeof bookSchema>;
