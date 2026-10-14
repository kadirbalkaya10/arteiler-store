/*
 * Gives an existing user the admin role. There is deliberately no UI or API for this.
 * Usage: npm run auth:make-admin -- someone@example.com
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) throw new Error("Usage: npm run auth:make-admin -- someone@example.com");

  const { count } = await prisma.user.updateMany({ where: { email }, data: { role: "admin" } });
  if (count === 0) throw new Error(`No user with email ${email}. They need to sign up first.`);

  console.log(`${email} is now an admin.`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
