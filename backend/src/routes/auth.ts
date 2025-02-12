import { Hono } from "hono";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { Bindings, Variables } from "../utils";
import { signinSchema, signupSchema } from "@nayalsaurav/blogapp";
import { User } from "@prisma/client";
const router = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// 📌 User Signup Route
router.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const parsedBody = signupSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        success: false,
        message: "input validation failed",
        errors: parsedBody.error.issues.map((err: any) => {
          return { path: err.path[0], message: err.message };
        }),
      },
      400
    );
  }
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(body.password, salt);
    const newUser: User = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
      },
    });
    const token = await sign(
      { id: newUser.id, email: newUser.email },
      c.env.JWT_SECRET
    );
    return c.json({
      success: true,
      message: "Account Created Successfully",
      token,
    });
  } catch (error) {
    throw error;
  }
});

// 📌 User Sign in Route
router.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const parsedBody = signinSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        success: false,
        message: "input validation failed",
        errors: parsedBody.error.issues.map((err: any) => {
          return { path: err.path[0], message: err.message };
        }),
      },
      400
    );
  }

  try {
    const user: User = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.json(
        { success: false, message: "No account with this email" },
        400
      );
    }

    const isCorrectPassword = await compare(body.password, user.password);
    if (!isCorrectPassword) {
      return c.json(
        { success: false, message: "user has entered incorrect password" },
        400
      );
    }

    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );

    return c.json(
      { success: true, message: "User Signed in Successfully", token },
      200
    );
  } catch (error) {
    throw error;
  }
});
export default router;
