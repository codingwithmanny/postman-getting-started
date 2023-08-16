// Imports
// ========================================================
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

// Config
// ========================================================
const prisma = new PrismaClient();

// Seed
// ========================================================
async function main() {
  const todos = [];

  for (let i = 0; i < 10;  i++) {
    todos.push(await prisma.todo.create({
      data: {
        task: faker.lorem.words(),
        isComplete: [true, false][Math.round(Math.random())],
      },
    }));
  }

  console.log(`Seeded ${todos.length} todos`);
}

// Init
// ========================================================
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
