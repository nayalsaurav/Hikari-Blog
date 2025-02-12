import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { Bindings, Variables } from "../utils";

// 📌 Authentication Middleware
export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  try {
    const fullToken = c.req.header("Authorization");
    if (!fullToken || !fullToken.startsWith("Bearer ")) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: Missing or invalid token",
        },
        401
      );
    }

    const token = fullToken.slice(7);
    const payload = (await verify(token, c.env.JWT_SECRET)) as {
      id: string;
      email: string;
    };
    if (!payload) {
      return c.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        401
      );
    }
    c.set("user", payload);

    await next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return c.json(
      {
        success: false,
        message: "Authentication failed",
      },
      401
    );
  }
});
