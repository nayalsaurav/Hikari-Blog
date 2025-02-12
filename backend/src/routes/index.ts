import { Hono } from "hono";
import authRouter from "./auth";
import blogRoute from "./blog";
import { getPrismaClient } from "../middleware/prisma";
const router = new Hono();
router.use("/*", getPrismaClient);
router.route("/user", authRouter);
router.route("/blog", blogRoute);

export default router;
