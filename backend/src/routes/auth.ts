import { Hono } from "hono";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "hono/jwt";

import { Bindings, Variables } from "../utils";
const router = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// 📌 User Signup Route
router.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  try {
    const { fullName, email, password } = await c.req.json();
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return c.json(
        { success: false, message: "User with this email already exists" },
        400
      );
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
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
  const { email, password } = await c.req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return c.json(
        { success: false, message: "No account with this email" },
        400
      );
    }

    const isCorrectPassword = await compare(password, user.password);
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
