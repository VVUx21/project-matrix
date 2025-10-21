import { PrismaClient } from "@prisma/client";

// Prevent creating multiple PrismaClient instances in development
// which can exhaust database connections when Next.js hot-reloads.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
