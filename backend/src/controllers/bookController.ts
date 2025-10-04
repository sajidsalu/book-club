import { FastifyRequest, FastifyReply } from "fastify";
import { BookBody } from "../types";

export async function getBooks(req: FastifyRequest, reply: FastifyReply) {
  const books = await req.server.prisma.book.findMany({
    include: { author: true },
  });
  reply.send(books);
}

export async function getBookById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const book = await req.server.prisma.book.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true },
  });
  if (!book) return reply.code(404).send({ message: "Book not found" });
  reply.send(book);
}

export async function createBook(
  req: FastifyRequest<{ Body: BookBody }>,
  reply: FastifyReply
) {
  const book = await req.server.prisma.book.create({
    data: req.body,
  });
  reply.code(201).send(book);
}

export async function updateBook(
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<BookBody> }>,
  reply: FastifyReply
) {
  try {
    const book = await req.server.prisma.book.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    reply.send(book);
  } catch {
    reply.code(404).send({ message: "Book not found" });
  }
}

export async function deleteBook(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await req.server.prisma.book.delete({
      where: { id: Number(req.params.id) },
    });
    reply.code(204).send();
  } catch {
    reply.code(404).send({ message: "Book not found" });
  }
}

export async function getBooksByAuthor(
  req: FastifyRequest<{ Params: { authorId: string } }>,
  reply: FastifyReply
) {
  const books = await req.server.prisma.book.findMany({
    where: { authorId: Number(req.params.authorId) },
    include: { author: true }, // optional, includes author details
  });

  if (!books || books.length === 0) {
    return reply.code(404).send({ message: "No books found for this author" });
  }

  reply.send(books);
}
