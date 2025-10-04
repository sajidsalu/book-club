import { PrismaClient } from "@prisma/client";
import { authorsSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  for (const author of authorsSeedData) {
    const createdAuthor = await prisma.author.create({
      data: {
        name: author.name,
        bio: author.bio,
        books: {
          create: author.books,
        },
      },
    });

    console.log(`Seeded author: ${createdAuthor.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
