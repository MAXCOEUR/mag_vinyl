import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import auth from "@/routes/auth";
import roles from "@/routes/roles";
import groups from "@/routes/groups";
import vinyls from "@/routes/vinyls";

const app = new Hono({ strict: false }).basePath("/v1/api");

app.get("/", (c) => {
  return c.text("Hello Hono 🔥🦆");
});
app.route("/groups", groups); // > donc v1/api/groups
app.route("/vinyls", vinyls); // > donc v1/api/vinyls
app.route("/auth", auth); // > donc v1/api/auth
app.route("/roles", roles); // > donc v1/api/roles
app.notFound(notFound);

export default app;
