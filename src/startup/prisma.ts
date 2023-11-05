import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma as PRISMA_CLIENT };
