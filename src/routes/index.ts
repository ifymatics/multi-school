import { Router } from "express";
import { schoolRoutes } from "./school";
import superAdminRoutes from "./super-admin";
import { apiKeyRoutes } from "./apiKeyRoute"

const router = Router();

router.use("/api/admin", superAdminRoutes);
router.use("/api/schools", schoolRoutes);
router.use("/api/api-keys", apiKeyRoutes);
export { router as appRoutes }