// Best practice for intalizing prisma client in react: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
// This is to prevent multiple instances of the prisma client from being instantiated

import { PrismaClient } from "@prisma/client";

const prismaGlobal = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = prismaGlobal.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;

export default prisma;