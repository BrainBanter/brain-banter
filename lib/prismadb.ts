import { PrismaClient } from "@prisma/client";

/*
This code is using TypeScript's declare global syntax to augment the global scope with a new variable named prisma.
The declare global block is used to modify the global environment in TypeScript. In this case, it's adding a new variable prisma to the global scope. This variable can either be an instance of PrismaClient or undefined.
This is useful because it allows the prisma variable to be accessed anywhere in the application without needing to be imported. It's particularly useful in this context because the prisma instance is something that might be used frequently throughout the application.
*/
declare global {
  var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === "production") globalThis.prisma = prismadb;

export default prismadb;