import { Router } from "express";
import { schoolRoutes } from "./school";
import superAdminRoutes from "./super-admin"
const router = Router();

router.use("/api/admin", superAdminRoutes);
router.use("/api/school", schoolRoutes);

export { router as appRoutes }