import Fastify from "fastify";
import cors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma";
import authorRoutes from "./routes/authors";
import bookRoutes from "./routes/books";

const server = Fastify({ logger: true, exposeHeadRoutes: true });

server.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Slug",
    "X-UID",
  ],
  credentials: true,
});

server.register(prismaPlugin);

server.register(authorRoutes, { prefix: "/authors" });
server.register(bookRoutes, { prefix: "/books" });

export default server;
