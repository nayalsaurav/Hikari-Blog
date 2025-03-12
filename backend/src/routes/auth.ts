import { Hono } from "hono";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { Bindings, Variables } from "../utils";
import { signinSchema, signupSchema } from "@nayalsaurav/blogapp";
import { User } from "@prisma/client";

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// 📌 User Signup Route
router.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const parsedBody = signupSchema.safeParse(body);

  if (!parsedBody.success) {
    return c.json(
      {
        success: false,
        message: "Input validation failed",
        errors: parsedBody.error.issues.map((err) => ({
          path: err.path[0],
          message: err.message,
        })),
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

    return c.json(
      {
        success: true,
        message: "Account created successfully",
        token,
      },
      201
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint error (duplicate email)
      return c.json({ success: false, message: "Email already in use" }, 409);
    }
    console.error("Signup error:", error);
    return c.json({ success: false, message: "Internal Server Error" }, 500);
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
        message: "Input validation failed",
        errors: parsedBody.error.issues.map((err) => ({
          path: err.path[0],
          message: err.message,
        })),
      },
      400
    );
  }

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return c.json(
        { success: false, message: "No account found with this email" },
        404
      );
    }

    const isCorrectPassword = await compare(body.password, user.password);
    if (!isCorrectPassword) {
      return c.json({ success: false, message: "Incorrect password" }, 401);
    }

    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );

    return c.json(
      { success: true, message: "User signed in successfully", token },
      200
    );
  } catch (error) {
    console.error("Signin error:", error);
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
});

export default router;
