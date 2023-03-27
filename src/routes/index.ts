import { Router } from "express";
import { schoolRoutes } from "./school";
import superAdminRoutes from "./super-admin"
const router = Router();

router.use(superAdminRoutes);
router.use(schoolRoutes);

export { router as appRoutes }