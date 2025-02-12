import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";

import { Prisma } from "@prisma/client";
import { Bindings, Variables } from "../utils";

const router = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// 📌 Create a Blog
router.post("/", authMiddleware, async (c) => {
  try {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const user = c.get("user");

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        authorId: user.id,
      },
    });

    return c.json(
      {
        success: true,
        message: "Blog created successfully",
        blogId: blog.id,
      },
      201
    );
  } catch (error) {
    throw error;
  }
});

// 📌 Update a Blog
router.put("/:id", authMiddleware, async (c) => {
  try {
    const prisma = c.get("prisma");
    const blogId = c.req.param("id");
    const body = await c.req.json();
    const user = c.get("user");

    const updatedBlog = await prisma.blog.update({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
      },
      where: {
        id: blogId,
        authorId: user.id,
      },
    });

    return c.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return c.json(
        { success: false, message: "Blog not found or unauthorized" },
        404
      );
    }
    throw error;
  }
});

// 📌 Delete a Blog
router.delete("/:id", authMiddleware, async (c) => {
  try {
    const prisma = c.get("prisma");
    const blogId = c.req.param("id");
    const user = c.get("user");

    const blog = await prisma.blog.delete({
      where: {
        id: blogId,
        authorId: user.id,
      },
    });

    return c.json(
      {
        success: true,
        message: "Blog deleted successfully",
        blog,
      },
      200
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return c.json(
        { success: false, message: "Blog not found or unauthorized" },
        404
      );
    }
    throw error;
  }
});

// 📌 Get all Blogs
router.get("/bulk", async (c) => {
  try {
    const prisma = c.get("prisma");
    const blogs = await prisma.blog.findMany({
      where: { published: true },
    });

    if (blogs.length === 0) {
      return c.json({ success: false, message: "No blogs available" }, 404);
    }

    return c.json(
      {
        success: true,
        message: "All blogs",
        blogs,
      },
      200
    );
  } catch (error) {
    throw error;
  }
});

// 📌 Get Blog by ID
router.get("/:id", async (c) => {
  try {
    const prisma = c.get("prisma");
    const blogId = c.req.param("id");

    const blog = await prisma.blog.findFirst({
      where: { id: blogId },
    });

    if (!blog || !blog.published) {
      return c.json(
        { success: false, message: "No blog found with given ID" },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Blog found",
        blog,
      },
      200
    );
  } catch (error) {
    throw error;
  }
});

export default router;
