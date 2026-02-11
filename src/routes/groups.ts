import { Hono } from "hono";
import { groupService } from "@/services/group-service";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";
import { isJwtValid } from "@/middlewares/check-jwt";
import { rbacGuard } from "@/middlewares/rbac-guard";
import { CREATED, NO_CONTENT, NOT_FOUND } from "@/shared/constants/http-status-codes";
import { vinylService } from "@/services/vinyl-service";

const api = new Hono();

// Appliquer les middlewares à toutes les routes
api.use(isJwtValid);
api.use(rbacGuard);

// Récupérer tous les groupes
api.get("/", async (c) => {
  const result = await groupService.fetchAll(c.req);
  c.res.headers.set("X-Count", `${result.xCount}`);
  return c.json(result.data);
});

// Récupérer un groupe par ID
api.get("/:id", isValidObjectIdMiddleware, async (c) => {
  const item = await groupService.fetchById(c.req);
  if (!item) return c.json({ message: "Groupe non trouvé" }, NOT_FOUND);
  return c.json(item);
});

// Créer un groupe
api.post("/", async (c) => {
  const newGroup = await groupService.createOne(c.req);
  return c.json(newGroup, CREATED);
});

// Modifier un groupe
api.put("/:id", isValidObjectIdMiddleware, async (c) => {
  const updated = await groupService.updateOne(c.req);
  if (!updated) return c.json({ message: "Groupe non trouvé" }, NOT_FOUND);
  return c.json(updated);
});

// Supprimer un groupe
api.delete("/:id", isValidObjectIdMiddleware, async (c) => {
  const deleted = await groupService.deleteOne(c.req);
  if (!deleted) return c.json({ message: "Groupe non trouvé" }, NOT_FOUND);
  return c.body(null, NO_CONTENT);
});

// Lister les albums d'un groupe spécifique
// URL: GET /api/groups/:id/vinyls
// URL pour les neufs: GET /api/groups/:id/vinyls?status=neuf
api.get("/:id/vinyls", isValidObjectIdMiddleware, async (c) => {
  const albums = await vinylService.fetchByGroup(c.req);
  
  if (!albums || albums.length === 0) {
    return c.json({ message: "Aucun album trouvé pour ce groupe" }, NOT_FOUND);
  }

  return c.json(albums);
});

export default api;