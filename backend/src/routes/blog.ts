import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { Prisma } from "@prisma/client";
import { Bindings, Variables } from "../utils";
import { blogSchema } from "@nayalsaurav/blogapp";

const router = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// 📌 Create a Blog
router.post("/", authMiddleware, async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const user = c.get("user");

  // Validate input
  const parsedBody = blogSchema.safeParse(body);
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
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        authorId: user.id,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return c.json(
      {
        success: true,
        message: "Blog created successfully",
        blog,
      },
      201
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

// 📌 Get all Blogs (with Pagination)
router.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            fullName: true,
          },
        },
      },
    });

    const totalBlogs = await prisma.blog.count({ where: { published: true } });

    return c.json(
      {
        success: true,
        message: "All blogs",
        data: blogs,
        pagination: {
          totalBlogs,
          currentPage: page,
          totalPages: Math.ceil(totalBlogs / limit),
        },
      },
      200
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

// 📌 Get Blog by ID
router.get("/:id", async (c) => {
  const prisma = c.get("prisma");
  const blogId = c.req.param("id");

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            fullName: true,
          },
        },
      },
    });

    if (!blog) {
      return c.json({ success: false, message: "Blog not found" }, 404);
    }

    return c.json({ success: true, message: "Blog found", data: blog }, 200);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

// 📌 Delete a Blog (Only Author)
router.delete("/:id", authMiddleware, async (c) => {
  const prisma = c.get("prisma");
  const blogId = c.req.param("id");
  const user = c.get("user");

  try {
    await prisma.blog.delete({
      where: { id: blogId, authorId: user.id },
    });

    return c.json({ success: true, message: "Blog deleted" }, 200);
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
    console.error("Error deleting blog:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

// 📌 Update a Blog (Only Author)
router.put("/:id", authMiddleware, async (c) => {
  const prisma = c.get("prisma");
  const blogId = c.req.param("id");
  const body = await c.req.json();
  const user = c.get("user");

  // Validate input
  const parsedBody = blogSchema.safeParse(body);
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
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId, authorId: user.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return c.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
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
    console.error("Error updating blog:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

export default router;
