import { FastifyInstance } from "fastify";
import * as authorController from "../controllers/authController";

export default async function authorRoutes(server: FastifyInstance) {
  server.get("/", authorController.getAuthors);
  server.get("/:id", authorController.getAuthorById);
  server.post("/", authorController.createAuthor);
  server.put("/:id", authorController.updateAuthor);
  server.delete("/:id", authorController.deleteAuthor);
}
