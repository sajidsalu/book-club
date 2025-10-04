import { FastifyInstance } from "fastify";
import * as bookController from "../controllers/bookController";

export default async function bookRoutes(server: FastifyInstance) {
  server.get("/", bookController.getBooks);
  server.get("/:id", bookController.getBookById);
  server.post("/", bookController.createBook);
  server.put("/:id", bookController.updateBook);
  server.delete("/:id", bookController.deleteBook);

  server.get("/list/:authorId", bookController.getBooksByAuthor);
}
