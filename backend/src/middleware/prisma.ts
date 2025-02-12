import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createMiddleware } from "hono/factory";
import { Bindings, Variables } from "../utils";

export const getPrismaClient = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  if (!c.get("prisma")) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set("prisma", prisma);

    try {
      await next();
    } finally {
      await prisma.$disconnect(); //Ensure proper cleanup in serverless
    }
  } else {
    await next();
  }
});
