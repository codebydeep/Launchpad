import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaClient from "@prisma/client";

const { PrismaClient } = prismaClient;

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };