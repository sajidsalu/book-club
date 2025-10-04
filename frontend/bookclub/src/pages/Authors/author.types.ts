import z from "zod";
import { authorSchema } from "./author.config";

export type AuthorFormData = z.infer<typeof authorSchema>;
