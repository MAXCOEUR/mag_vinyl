import { Hono } from "hono";
import { vinylService } from "@/services/vinyl-service";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";
import { isJwtValid } from "@/middlewares/check-jwt";
import { rbacGuard } from "@/middlewares/rbac-guard";
import { CREATED, NO_CONTENT, NOT_FOUND } from "@/shared/constants/http-status-codes";

const api = new Hono();

// Appliquer les middlewares à toutes les routes
api.use(isJwtValid);
api.use(rbacGuard);

// Récupérer tous les vinyls
api.get("/", async (c) => {
  const result = await vinylService.fetchAll(c.req);
  c.res.headers.set("X-Count", `${result.xCount}`);
  return c.json(result.data);
});

// Récupérer un vinyl par ID
api.get("/:id", isValidObjectIdMiddleware, async (c) => {
  const item = await vinylService.fetchById(c.req);
  if (!item) return c.json({ message: "Vinyl non trouvé" }, NOT_FOUND);
  return c.json(item);
});

// Créer un vinyl
api.post("/", async (c) => {
  const newItem = await vinylService.createOne(c.req);
  return c.json(newItem, CREATED);
});

// Modifier un vinyl
api.put("/:id", isValidObjectIdMiddleware, async (c) => {
  const updated = await vinylService.updateOne(c.req);
  if (!updated) return c.json({ message: "Vinyl non trouvé" }, NOT_FOUND);
  return c.json(updated);
});

// Supprimer un vinyl
api.delete("/:id", isValidObjectIdMiddleware, async (c) => {
  const deleted = await vinylService.deleteOne(c.req);
  if (!deleted) return c.json({ message: "Vinyl non trouvé" }, NOT_FOUND);
  return c.body(null, NO_CONTENT);
});

api.patch("/:id", isValidObjectIdMiddleware, async (c) => {
  const updated = await vinylService.patchVinyl(c.req);
  if (!updated) return c.json({ message: "Vinyl non trouvé" }, NOT_FOUND);
  return c.json(updated);
});

export default api;