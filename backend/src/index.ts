import { Hono } from "hono";
import { cors } from "hono/cors";
import rootRouter from "./routes/index";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", rootRouter);

//📌 Global error handler
app.onError((err, c) => {
  console.error("Error:", err);

  return c.json(
    {
      success: false,
      message: err.message || "Something went wrong!",
    },
    500
  );
});
//📌 Invalid route
app.notFound((c) => {
  return c.json({
    message: "Invalid route",
  });
});
export default app;
