import { PrismaClient } from "@prisma/client/extension";

export type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export type Variables = {
  user: {
    id: string;
    email: string;
  };
  prisma: PrismaClient;
};
