import { FastifyRequest, FastifyReply } from "fastify";

export async function getAuthors(req: FastifyRequest, reply: FastifyReply) {
  const authors = await req.server.prisma.author.findMany();
  reply.send(authors);
}

export async function getAuthorById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const author = await req.server.prisma.author.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!author) return reply.code(404).send({ message: "Author not found" });
  reply.send(author);
}

export async function createAuthor(
  req: FastifyRequest<{ Body: { name: string; bio?: string } }>,
  reply: FastifyReply
) {
  const author = await req.server.prisma.author.create({ data: req.body });
  reply.code(201).send(author);
}

export async function updateAuthor(
  req: FastifyRequest<{
    Params: { id: string };
    Body: { name?: string; bio?: string };
  }>,
  reply: FastifyReply
) {
  try {
    const author = await req.server.prisma.author.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    reply.send(author);
  } catch {
    reply.code(404).send({ message: "Author not found" });
  }
}

export async function deleteAuthor(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const authorId = Number(req.params.id);

    await req.server.prisma.book.deleteMany({
      where: { authorId: authorId },
    });

    await req.server.prisma.author.delete({
      where: { id: authorId },
    });

    reply.code(204).send();
  } catch (err) {
    console.log("errror", err);
    reply.code(404).send({ message: "Author not found" });
  }
}
