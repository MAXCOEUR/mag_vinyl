import { serve } from "@hono/node-server";
import { DbConnect } from "@/db";

import app from "./app";

await DbConnect();

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
